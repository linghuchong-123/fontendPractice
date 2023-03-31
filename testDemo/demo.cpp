_radiusEquator = 6378137              // 长轴
    _radiusPolar = 6356752.3142451793 // 短轴

    void
    computeCoefficients()
{
  double flattening = (_radiusEquator - _radiusPolar) / _radiusEquator;
  _eccentricitySquared = 2 * flattening - flattening * flattening;
}

// X，Y，Z为你计算出来的平移结果

inline void EllipsoidModel::convertXYZToLatLongHeight(double X, double Y, double Z,
                                                      double &latitude, double &longitude, double &height) const
{
  // handle polar and center-of-earth cases directly.
  if (X != 0.0)
    longitude = atan2(Y, X);
  else
  {
    if (Y > 0.0)
      longitude = PI_2;
    else if (Y < 0.0)
      longitude = -PI_2;
    else
    {
      // at pole or at center of the earth
      longitude = 0.0;
      if (Z > 0.0)
      { // north pole.
        latitude = PI_2;
        height = Z - _radiusPolar;
      }
      else if (Z < 0.0)
      { // south pole.
        latitude = -PI_2;
        height = -Z - _radiusPolar;
      }
      else
      { // center of earth.
        latitude = PI_2;
        height = -_radiusPolar;
      }
      return;
    }
  }

  // http://www.colorado.edu/geography/gcraft/notes/datum/gif/xyzllh.gif
  double p = sqrt(X * X + Y * Y);
  double theta = atan2(Z * _radiusEquator, (p * _radiusPolar));
  double eDashSquared = (_radiusEquator * _radiusEquator - _radiusPolar * _radiusPolar) /
                        (_radiusPolar * _radiusPolar);

  double sin_theta = sin(theta);
  double cos_theta = cos(theta);

  latitude = atan((Z + eDashSquared * _radiusPolar * sin_theta * sin_theta * sin_theta) /
                  (p - _eccentricitySquared * _radiusEquator * cos_theta * cos_theta * cos_theta));

  double sin_latitude = sin(latitude);
  double N = _radiusEquator / sqrt(1.0 - _eccentricitySquared * sin_latitude * sin_latitude);

  height = p / cos(latitude) - N;
}

// localToWorld先赋值了T，再计算赋值R

inline void EllipsoidModel::computeCoordinateFrame(double latitude, double longitude, osg::Matrixd &localToWorld) const
{
  // Compute up vector
  osg::Vec3d up(cos(longitude) * cos(latitude), sin(longitude) * cos(latitude), sin(latitude));

  // Compute east vector
  osg::Vec3d east(-sin(longitude), cos(longitude), 0);

  // Compute north vector = outer product up x east
  osg::Vec3d north = up ^ east;

  // set matrix
  localToWorld(0, 0) = east[0];
  localToWorld(0, 1) = east[1];
  localToWorld(0, 2) = east[2];

  localToWorld(1, 0) = north[0];
  localToWorld(1, 1) = north[1];
  localToWorld(1, 2) = north[2];

  localToWorld(2, 0) = up[0];
  localToWorld(2, 1) = up[1];
  localToWorld(2, 2) = up[2];
}
