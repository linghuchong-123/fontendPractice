for (let i = 0; i < successData.length; i++) {
  const ele = successData[i];
  const eleText = ele.name;
  if (ele.elementtype == "point") {
    try {
      const eleStyle = JSON.parse(ele.style);
      const ptGeo = eleStyle.cGeometry;
      if (ptGeo !== undefined) {
        const iconSymbol = eleStyle.iconSymbol;
        const eleGeo = [ptGeo.X, ptGeo.Y];
        const iconUrl = iconSymbol.Url;
        const eleColor = "#ffffff";
        const regStr = /^Data/;
        const iconSymbolFlag = regStr.test(iconUrl);

        if (iconSymbolFlag)
          drawPoint(
            `element,${ele.propertytype},${ele.property_id},${ele.name},${ele.id}`,
            iconUrl,
            eleText,
            eleColor,
            eleGeo
          );
      }
    } catch (error) {
      continue; // 跳出本次循环，和try catch结合使用
    }
  }
}