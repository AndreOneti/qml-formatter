import QtQuick 2.0
import QtQuick.Pratices 2.0

import "content"

Item {
  id: window

  property int offset: 0
  property int margin: 5

  height: 480
  width: 320

  signal clicked();

  /**
   * @param {int} wid New width from window.
   * @return {void}
   */
  function setWidth(wid)
  {
    window.width = wid;
  }

  onClicked: window.focus = false;

  MouseArea {
    anchors.fill: parent
    cursorShape: Qt.PointingHandCursor
    onClicked: clicked()
  }
}