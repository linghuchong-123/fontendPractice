const _radiusEquator = 6378137; //长轴
const _radiusPolar = 6356752.3142451793; //短轴

let _eccentricitySquared;
function computeCoefficients() {
  const flattening = (_radiusEquator - _radiusPolar) / _radiusEquator;
  _eccentricitySquared = 2 * flattening - flattening * flattening;
}

// X，Y，Z为你计算出来的平移结果
function EllipsoidModel(X, Y, Z, latitude, longitude, height) {
  // handle polar and center-of-earth cases directly.
  if (X != 0.0) longitude = atan2(Y, X);
  else {
    if (Y > 0.0) longitude = PI_2;
    else if (Y < 0.0) longitude = -PI_2;
    else {
      // at pole or at center of the earth
      longitude = 0.0;
      if (Z > 0.0) {
        // north pole.
        latitude = PI_2;
        height = Z - _radiusPolar;
      } else if (Z < 0.0) {
        // south pole.
        latitude = -PI_2;
        height = -Z - _radiusPolar;
      } else {
        // center of earth.
        latitude = PI_2;
        height = -_radiusPolar;
      }
      return;
    }
  }

  // http://www.colorado.edu/geography/gcraft/notes/datum/gif/xyzllh.gif
  const p = sqrt(X * X + Y * Y);
  const theta = atan2(Z * _radiusEquator, p * _radiusPolar);
  const eDashSquared =
    (_radiusEquator * _radiusEquator - _radiusPolar * _radiusPolar) /
    (_radiusPolar * _radiusPolar);

  const sin_theta = Math.sin(theta);
  const cos_theta = Math.cos(theta);

  latitude = atan(
    (Z + eDashSquared * _radiusPolar * sin_theta * sin_theta * sin_theta) /
      (p -
        _eccentricitySquared *
          _radiusEquator *
          cos_theta *
          cos_theta *
          cos_theta)
  );

  const sin_latitude = sin(latitude);
  const N =
    _radiusEquator /
    sqrt(1.0 - _eccentricitySquared * sin_latitude * sin_latitude);

  height = p / cos(latitude) - N;
}

// localToWorld先赋值了T，再计算赋值R
const localToWorld = [[], [], []];
function EllipsoidModel(latitude, longitude) {
  // Compute up vector
  const up = [
    Math.cos(longitude) * Math.cos(latitude),
    Math.sin(longitude) * Math.cos(latitude),
    Math.sin(latitude),
  ];

  // Compute east vector
  const east = [-sin(longitude), cos(longitude), 0];

  // Compute north vector = outer product up x east
  const north = up ^ east;

  // set matrix
  localToWorld[0][0] = east[0];
  localToWorld[0][1] = east[1];
  localToWorld[0][2] = east[2];

  localToWorld[1][0] = north[0];
  localToWorld[1][1] = north[1];
  localToWorld[1][2] = north[2];

  localToWorld[2][0] = up[0];
  localToWorld[2][1] = up[1];
  localToWorld[2][2] = up[2];
}
