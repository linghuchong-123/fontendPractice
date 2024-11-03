import { math } form '@sk-3d/core';
import type { Polygon } from '@sk-3d/math/types';

export interface IPaveRegionInfo {
  region: Polygon;
  paveDirection: math.Vec2;
}

interface IRangeInfo {
  startPt: math.Vec2;
  endPt: math.Vec2;
  hasHole: boolean;
}

/** 壁板自动铺贴相关 */
export class WallBoardAutoPaveUtil {
  /**根据给出的整体polygon和hole，返回切分后的区域
   * @param wholePolygon 外轮廓
   * @param holes 门窗洞+选中壁板
   * @param selected 选中壁板
   */
  public static getTrimmedPolygon(wholePolygon: Polygon, holes: Polygon[], selected: Polygon): IPaveRegionInfo{
    const { y: wholeHeight } = wholePolygon.getBBox().getSize();
    // 外轮廓底边
    const wholeBottomEdge = this._getPolygonEdgeInfo(wholePolygon).bottomEdge;
    // 洞的顶点
    const holeCornerPts = this._getPolygonCornerPt(holes);
    // 洞的顶点在底边上的投影点
    const sortedPoints = this._getPtAtLine(holeCornerPts, wholeBottomEdge);
    // 底边端点+投影点构成的区间
    const ranges = this.getRanges(sortedPoints, wholeBottomEdge);
    // 区间信息
    const rangesInfo = this._getRangesInfo(ranges, holes);
    // 把区间分为两类，1.有洞  2.五洞
    const hasHoleRange = rangesInfo.filter(value => value.hasHole);
    const noHoleRange = rangesInfo.filter(value => !value.hasHole);
    // 无洞区间，铺贴区域
    const noHolePaveRegions = this._getNoHolePaveRegions(noHoleRange, wholeHeight);
    // 有洞区间，铺贴区域
    const hasHoleRegions = this._getHasHolePaveRegions(hasHoleRange, wholeHeight, holes);
    // 为每个铺贴区域添加铺贴方向
    const paveRegionInfo = [...noHolePaveRegions, ...hasHoleRegions].reduce((total: IPaveRegionInfo[], current) => {
      const selectedLeftEdge = this._getPolygonEdgeInfo(selected).leftEdge;
      const leftEdgeVec = selectedLeftEdge.toVector2();
      const leftEdgeStartPt = selectedLeftEdge.getStartPt();
      const currentCentroidPt = current.getCentroidPoint();
      const currentCentroidVec = new math.Vec2(leftEdgeStartPt, currentCentroidPt);
      const angle = leftEdgeVec.angleTo(currentCentroidVec);
      if (angle < Math.PI) {
        total.push({
          region: current,
          paveDirection: math.Vec2.X().reverse(),
        });
      } else {
        total.push({
          region: current,
          paveDirection: math.Vec2.X()
        })
      };
      return total;
    }, []);
    return paveRegionInfo;
  }
  /* 获取带有边线位置信息的polygon
   @param polygon 矩形
  */
  private static _getPolygonEdgeInfo(polygon: Polygon) {
    const allCurves = polygon.getAllCurves();
    const topBottomEdge: math.Curve2[] = allCurves.reduce((total: math.Curve2[], current) => {
      if (current.getStartPt().y === current.getEndPt().y) total.push(current);
      return total;
    }, []);
    const leftRightEdge: math.Curve2[] = allCurves.reduce((total: math.Curve2[], current) => {
      if (current.getStartPt().x === current.getEndPt().x) total.push(current);
      return total;
    }, []);
    const edge1 = topBottomEdge[0] as math.Ln2;
    const edge2 = topBottomEdge[1] as math.Ln2;
    const edge3 = leftRightEdge[0] as math.Ln2;
    const edge4 = leftRightEdge[1] as math.Ln2;
    let topEdge = new math.Ln2();
    let bottomEdge = new math.Ln2();
    let leftEdge = new math.Ln2();
    let rightEdge = new math.Ln2();
    if (edge1.getStartPt().y < edge2.getStartPt().y) {
      bottomEdge = edge1;
      topEdge = edge2;
    } else {
      bottomEdge = edge2;
      topEdge = edge1
    };
    if (edge3.getStartPt().x < edge3.getStartPt().x) {
      leftEdge = edge3;
      rightEdge = edge4;
    } else {
      leftEdge = edge4;
      rightEdge = edge3;
    };
    if (bottomEdge.getStartPt().x > bottomEdge.getEndPt().x) bottomEdge.reverse();
    if (leftEdge.getStartPt().y > leftEdge.getEndPt().y) leftEdge.reverse();
    return { topEdge, bottomEdge, leftEdge, rightEdge };
  }

  /** 底边上的区间 */
  private static _getRanges(points: math.Vec2[], line: math.Ln2): [math.Vec2, math.Vec2][] {
    const startPt = line.getStartPt();
    const endPt = line.getEndPt();
    points.unshift(startPt);
    points.push(endPt);
    const length = points.length;
    const pointRanges = points.reduce((total: [math.Vec2, math.Vec2][], current, index, arr) => {
      if (index < length - 2) {
        total.push([current, arr[index +]])
      }
      return total;
    }, []);
    return pointRanges;
  }

  /** 底边上的区域，含hole信息 */
  private static _getRangesInfo(ranges: [math.Vec2, math.Vec2][], holes: Polygon[]): IRangeInfo[]{
    const rangeInfo = ranges.reduce((total: IRangeInfo[], current) => {
      const rangeLine = new math.Ln2(current[0], current[1]);
      const startParam = rangeLine.getStartParam();
      const endParam = rangeLine.getEndParam();
      let hasFlag = false;
      for (const hole of holes) {
        const holeCornerPts = WallBoardAutoPaveUtil._getPolygonCornerPt([hole]);
        for (const pt of holeCornerPts) {
          const ptParam = rangeLine.getParamAt(pt);
          if (ptParam >= startParam && ptParam <= endParam) {
            hasFlag = true;
          }
        }
      };
      if (hasFlag) {
        total.push({
          startPt: current[0],
          endPt: current[1],
          hasHole: false,
        })
      } else {
        total.push({
          startPt: current[0],
          endPt: current[1],
          hasHole: true,
        })
      }
      return total;
    }, []);
    return rangeInfo;
  }

  /** 获取没有洞的铺贴区域 */
  private static _getNoHolePaveRegions(rangeInfo: IRangeInfo[], height: number):Polygon[] {
    const noHolePaveRegions = rangeInfo.reduce((total:Polygon[],current) => {
      const leftBottomPt = current.startPt;
      const rightBottomPt = current.endPt;
      const rightTopPt = current.endPt.added(math.Vec2.Y().multiply(height));
      const leftTopPt = current.startPt.added(math.Vec2.Y().multiply(height));
      const polygon = new math.Polygon([leftBottomPt, rightBottomPt, rightTopPt, leftTopPt]);
      total.push(polygon);
      return total;
    },[])
  }

  /** 获取有洞区间的铺贴区域 */
  private static _getHasHolePaveRegions(rangeInfos: IRangeInfo[], height: number, holes: Polygon[]) {
    const allPaveRegions = rangeInfos.reduce((total: Polygon[], current) => {
      const regions = this._getHasHolePaveRegionsInOneRange(current, height, holes);
      total.push(...regions);
      return total;
    }, []);
    // 横向上相邻的区域，合并
    /** 循环数组，满足合并条件时，用合并的polygon替换原来两个小的polygon */
    allPaveRegions.forEach((currentPolygon, i) => {
      for (let k = i = 1; k < allPaveRegions.length; k++) {
        const nextPolygon = allPaveRegions[k];
        const loopRelation = math.alg.PJ.loopToLoop(
          currentPolygon.getLoops()[0],
          nextPolygon.getLoops()[0],
          undefined,
          false
        );
        if (loopRelation === math.alg.LoopsPJType.OUT) {
          const currentCornerPts = currentPolygon.getBBox().getCornerPts();
          const nextCornerPts = nextPolygon.getBBox().getCornerPts();
          const newPolygon = new math.Polygon([...currentCornerPts, ...nextCornerPts]);
          allPaveRegions.splice(i, 1);
          allPaveRegions.splice(k, 1);
          allPaveRegions.push(newPolygon)
        }
      }
    });
    return allPaveRegions;
  }

  /** 获取有洞的单个区间的铺贴区域 */
  private static _getHasHolePaveRegionsInOneRange(rangeInfo: IRangeInfo,height:number,holes:Polygon[]):Polygon[] {
    const rangeLeftLnEndPt = rangeInfo.startPt.added(math.Vec2.Y().multiply(height));
    const rangeLeftLine = new math.Ln2(rangeInfo.startPt, rangeLeftLnEndPt);
    // 洞的上下边界线
    const holeTopBottomEdges = holes.reduce((total: math.Ln2[], current) => {
      const holeTopEdge = this._getPolygonEdgeInfo(current).topEdge;
      const holeBottomEdge = this._getPolygonEdgeInfo(current).bottomEdge;
      total.push(holeTopEdge, holeBottomEdge);
      return total;
    }, []);
    const interPts = holeTopBottomEdges.reduce((total: Set<math.Vec2>, current: math.Ln2) => {
      const interPt = math.alg.X.curve2ds(current, rangeLeftLine)[0]?.point;
      if (interPt) total.add(interPt);
      return total;
    }, new Set() as Set<math.Vec2>);

    const sortedInterPts = Array.from(interPts).sort((a, b) => a.y - b.y);
    const verticalRanges: [math.Vec2, math.Vec2][] = this._getRanges(sortedInterPts, rangeLeftLine);
    // 在洞内的区间，舍弃
    const verticalRangeFilter = verticalRanges.filter((value) => {
      const ln = new math.Ln2(value[0], value[1]);
      const middlePt = ln.getMidPt();
      for (const hole of holes) {
        const positionRelation = math.alg.PJ.ptToPolygon(middlePt, hole);
        if (positionRelation !== math.alg.PtLoopPJType.IN) return value;
      }
    });
    const crossRangeWidth = rangeInfo.startPt.distanceTo(rangeInfo.endPt);
    const paveRegions = verticalRangeFilter.reduce((total: Polygon[], current) => {
      const bottom = current[0].y;
      const top = current[1].y;
      const left = current[0].x;
      const right = current[1].x + crossRangeWidth;
      const leftBottomPt = new math.Vec2(left, bottom);
      const rightBottomPt = new math.Vec2(right, bottom);
      const rightTopPt = new math.Vec2(right, top);
      const leftTopPt = new math.Vec2(left, top);
      const polygon = new math.Polygon([leftBottomPt, rightBottomPt, rightTopPt, leftTopPt]);
      total.push(polygon);
      return total;
    }, []);
    return paveRegions;
  };

  /** 获取polygon顶点 */
  private static _getPolygonCornerPt(polygons: Polygon[]) {
    const cornerPts = polygons.reduce((total: math.Vec2[], current) => {
      const pts = current.getBBox().getCornerPts();
      total.push(...pts);
      return total;
    }, []);
    return cornerPts;
  }

  /** 点在直线上的投影点 */
  private static _getPtAtLine(points: math.Vec2[], line: math.Ln2) {
    const params = points.reduce((total: Set<number>, current) => {
      const param = line.getParamAt(current);
      total.add(param);
      return total;
    }, new Set() as Set<number>);
    const paramsSorted = Array.from(params).sort((a, b) => a - b);
    const sortedPoints = paramsSorted.reduce((total: math.Vec2[], current) => {
      const point = line.getPtAt(current);
      total.push(point);
      return total;
    }, []);
    return sortedPoints;
  }
};




 