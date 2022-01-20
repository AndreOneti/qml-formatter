interface IReferences {
  [key: string]: any;
}
const References: IReferences = {
  rectangle: {
    properties: {
      antialiasing: "bool",
      gradient: "any",
      color: "color",
      radius: "real",
      border: {
        color: "color",
        width: "int",
      },
    },
    inherit: "item",
  },
  item: {
    properties: {
      activeFocus: "bool",
      activeFocusOnTab: "bool",
      anchors: {
        alignWhenCentered: "bool",
        baseline: "AnchorLine",
        baselineOffset: "real",
        bottom: "AnchorLine",
        bottomMargin: "real",
        centerIn: "Item",
        fill: "Item",
        horizontalCenter: "AnchorLine",
        horizontalCenterOffset: "real",
        left: "AnchorLine",
        leftMargin: "real",
        margins: "real",
        right: "AnchorLine",
        rightMargin: "real",
        top: "AnchorLine",
        topMargin: "real",
        verticalCenter: "AnchorLine",
        verticalCenterOffset: "real",
      },
      antialiasing: "bool",
      baselineOffset: "int",
      children: "list<Item>",
      childrenRect: {
        height: "real",
        width: "real",
        x: "real",
        y: "real",
      },
      clip: "bool",
      containmentMask: "QObject*",
      data: "list<Object> [default]",
      enabled: "bool",
      focus: "bool",
      height: "real",
      implicitHeight: "real",
      implicitWidth: "real",
      layer: {
        effect: "Component",
        enabled: "bool",
        format: "enumeration",
        mipmap: "bool",
        samplerName: "string",
        samples: "enumeration",
        smooth: "bool",
        sourceRect: "rect",
        textureMirroring: "enumeration",
        textureSize: "size",
        wrapMode: "enumeration",
      },
      opacity: "real",
      parent: "Item",
      resources: "list<Object>",
      rotation: "real",
      scale: "real",
      smooth: "bool",
      state: "string",
      states: "list<State>",
      transform: "list<Transform>",
      transformOrigin: "enumeration",
      transitions: "list<Transition>",
      visible: "bool",
      visibleChildren: "list<Item>",
      width: "real",
      x: "real",
      y: "real",
      z: "real",
      // childAt(real x, real y)
      // bool contains(point point)
      // forceActiveFocus(Qt::FocusReason reason)
      // forceActiveFocus()
      // bool grabToImage(callback, targetSize)
      // object mapFromGlobal(real x, real y)
      // object mapFromItem(Item item, rect r)
      // object mapFromItem(Item item, real x, real y, real width, real height)
      // object mapFromItem(Item item, point p)
      // object mapFromItem(Item item, real x, real y)
      // object mapToGlobal(real x, real y)
      // object mapToItem(Item item, rect r)
      // object mapToItem(Item item, real x, real y, real width, real height)
      // object mapToItem(Item item, point p)
      // object mapToItem(Item item, real x, real y)
      // nextItemInFocusChain(bool forward)
    },
    inherit: "qtobject",
  },
  qtobject: {
    properties: {
      id: "any",
      objectName: "string",
    },
  },
};

export default References;
