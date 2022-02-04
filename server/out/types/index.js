"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const References = {
    Abstract3DSeries: {
        properties: {
            baseColor: "color",
            baseGradient: "ColorGradient",
            colorStyle: "Theme3D.ColorStyle",
            itemLabel: "string",
            itemLabelFormat: "string",
            itemLabelVisible: "bool",
            mesh: "Abstract3DSeries.Mesh",
            meshRotation: "quaternion",
            meshSmooth: "bool",
            multiHighlightColor: "color",
            multiHighlightGradient: "ColorGradient",
            name: "string",
            singleHighlightColor: "color",
            singleHighlightGradient: "ColorGradient",
            type: "Abstract3DSeries.SeriesType",
            userDefinedMesh: "string",
            visible: "bool",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    Rectangle: {
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
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Rectangle items are used to fill areas with solid color or gradients, and/or to provide a rectangular border.`,
        },
        inherit: "Item",
    },
    Button: {
        properties: {
            flat: "bool",
            highlighted: "bool",
        },
        signals: {},
        methods: {},
        inherit: "AbstractButton",
    },
    AbstractButton: {
        properties: {
            action: "Action",
            autoExclusive: "bool",
            autoRepeat: "bool",
            autoRepeatDelay: "int",
            autoRepeatInterval: "int",
            checkable: "bool",
            checked: "bool",
            display: "enumeration",
            down: "bool",
            icon: {
                cache: "bool",
                color: "color",
                height: "int",
                name: "string",
                source: "url",
                width: "int",
            },
            implicitIndicatorHeight: "real",
            implicitIndicatorWidth: "real",
            indicator: "Item",
            pressX: "real",
            pressY: "real",
            pressed: "bool",
            text: "string",
        },
        signals: {
            canceled: "voide-()",
            clicked: "voide-()",
            doubleClicked: "voide-()",
            pressAndHold: "voide-()",
            pressed: "voide-()",
            released: "voide-()",
            toggled: "voide-()",
        },
        methods: {
            toggle: "void-()",
        },
        inherit: "Control",
    },
    Control: {
        properties: {
            availableHeight: "real",
            availableWidth: "real",
            background: "Item",
            bottomInset: "real",
            bottomPadding: "real",
            contentItem: "Item",
            focusPolicy: "enumeration",
            focusReason: "enumeration",
            font: "font",
            horizontalPadding: "real",
            hoverEnabled: "bool",
            hovered: "bool",
            implicitBackgroundHeight: "real",
            implicitBackgroundWidth: "real",
            implicitContentHeight: "real",
            implicitContentWidth: "real",
            leftInset: "real",
            leftPadding: "real",
            locale: "Locale",
            mirrored: "bool",
            padding: "real",
            palette: "palette",
            rightInset: "real",
            rightPadding: "real",
            spacing: "real",
            topInset: "real",
            topPadding: "real",
            verticalPadding: "real",
            visualFocus: "bool",
            wheelEnabled: "bool",
        },
        signals: {},
        methods: {},
        inherit: "Item",
    },
    ComboBox: {
        properties: {
            acceptableInput: "bool",
            count: "int",
            currentIndex: "int",
            currentText: "string",
            currentValue: "string",
            delegate: "Component",
            displayText: "string",
            down: "bool",
            editText: "string",
            editable: "bool",
            flat: "bool",
            highlightedIndex: "int",
            implicitIndicatorHeight: "real",
            implicitIndicatorWidth: "real",
            indicator: "Item",
            inputMethodComposing: "bool",
            inputMethodHints: "flags",
            model: "model",
            popup: "Popup",
            pressed: "bool",
            selectTextByMouse: "bool",
            textRole: "string",
            validator: "Validator",
            valueRole: "string",
        },
        signals: {
            accepted: "void-()",
            activated: "void-(int index)",
            highlighted: "void-(int index)",
        },
        methods: {
            decrementCurrentIndex: "void-()",
            find: "int-(string text, enumeration flags)",
            incrementCurrentIndex: "void-()",
            indexOfValue: "int-(object value)",
            selectAll: "void-()",
            textAt: "string-(int index)",
        },
        inherit: "Control",
    },
    MouseArea: {
        properties: {
            acceptedButtons: "Qt::MouseButtons",
            containsMouse: "bool",
            containsPress: "bool",
            cursorShape: "Qt::CursorShape",
            drag: {
                active: "bool",
                axis: "enumeration",
                filterChildren: "bool",
                maximumX: "real",
                maximumY: "real",
                minimumX: "real",
                minimumY: "real",
                smoothed: "bool",
                target: "Item",
                threshold: "real",
            },
            enabled: "bool",
            hoverEnabled: "bool",
            mouseX: "real",
            mouseY: "real",
            pressAndHoldInterval: "int",
            pressed: "bool",
            pressedButtons: "MouseButtons",
            preventStealing: "bool",
            propagateComposedEvents: "bool",
            scrollGestureEnabled: "bool",
        },
        signals: {
            canceled: "void-()",
            clicked: "void-(MouseEvent mouse)",
            doubleClicked: "void-(MouseEvent mouse)",
            entered: "void-()",
            exited: "void-()",
            positionChanged: "void-(MouseEvent mouse)",
            pressAndHold: "void-(MouseEvent mouse)",
            pressed: "void-(MouseEvent mouse)",
            released: "void-(MouseEvent mouse)",
            wheel: "void-(WheelEvent wheel)",
        },
        methods: {},
        inherit: "Item",
    },
    Item: {
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
        },
        signals: {},
        methods: {
            childAt: "void-(real x, real y)",
            contains: "bool-(point point)",
            forceActiveFocus: ["void-(Qt::FocusReason reason)", "void-()"],
            grabToImage: "bool-(callback, targetSize)",
            mapFromGlobal: "object-(real x, real y)",
            mapFromItem: [
                "object-(Item item, rect r)",
                "object-(Item item, real x, real y, real width, real height)",
                "object-(Item item, point p)",
                "object-(Item item, real x, real y)",
            ],
            mapToGlobal: "object-(real x, real y)",
            mapToItem: [
                "object-(Item item, rect r)",
                "object-(Item item, real x, real y, real width, real height)",
                "object-(Item item, point p)",
                "object-(Item item, real x, real y)",
            ],
            nextItemInFocusChain: "void-(bool forward)",
        },
        inherit: "QtObject",
    },
    Page: {
        properties: {
            footer: "Item",
            header: "Item",
            implicitFooterHeight: "real",
            implicitFooterWidth: "real",
            implicitHeaderHeight: "real",
            implicitHeaderWidth: "real",
            title: "string",
        },
        signals: {},
        methods: {},
        inherit: "Pane",
    },
    Pane: {
        properties: {
            contentChildren: "list<Item>",
            contentData: "list<Object>",
            contentHeight: "real",
            contentWidth: "real",
        },
        signals: {},
        methods: {},
        inherit: "Control",
    },
    QtObject: {
        properties: {
            id: "any",
            objectName: "string",
        },
        signals: {},
        methods: {},
    },
    ScrollView: {
        properties: {
            contentChildren: "list<Item>",
            contentData: "list<Object>",
        },
        signals: {},
        methods: {},
        inherit: "Pane",
    },
    Popup: {
        properties: {
            activeFocus: "bool",
            anchors: {
                centerIn: "Object",
            },
            availableHeight: "real",
            availableWidth: "real",
            background: "Item",
            bottomInset: "real",
            bottomMargin: "real",
            bottomPadding: "real",
            clip: "bool",
            closePolicy: "enumeration",
            contentChildren: "list<Item>",
            contentData: "list<Object>",
            contentHeight: "real",
            contentItem: "Item",
            contentWidth: "real",
            dim: "bool",
            enabled: "bool",
            enter: "Transition",
            exit: "Transition",
            focus: "bool",
            font: "font",
            height: "real",
            horizontalPadding: "real",
            implicitBackgroundHeight: "real",
            implicitBackgroundWidth: "real",
            implicitContentHeight: "real",
            implicitContentWidth: "real",
            implicitHeight: "real",
            implicitWidth: "real",
            leftInset: "real",
            leftMargin: "real",
            leftPadding: "real",
            locale: "Locale",
            margins: "real",
            mirrored: "bool",
            modal: "bool",
            opacity: "real",
            opened: "bool",
            padding: "real",
            palette: "palette",
            parent: "Item",
            rightInset: "real",
            rightMargin: "real",
            rightPadding: "real",
            scale: "real",
            spacing: "real",
            topInset: "real",
            topMargin: "real",
            topPadding: "real",
            transformOrigin: "enumeration",
            verticalPadding: "real",
            visible: "bool",
            width: "real",
            x: "real",
            y: "real",
            z: "real",
        },
        signals: {
            aboutToHide: "void",
            aboutToShow: "void",
            closed: "void",
            opened: "void",
        },
        methods: {
            close: "void-()",
            forceActiveFocus: "void-(enumeration reason)",
            open: "void",
        },
        inherit: "QtObject",
    },
    Menu: {
        properties: {
            cascade: "bool",
            contentData: "list<Object>",
            contentModel: "model",
            count: "int",
            currentIndex: "int",
            delegate: "Component",
            focus: "bool",
            overlap: "real",
            title: "string",
        },
        signals: {},
        methods: {
            actionAt: "Action-(int index)",
            addAction: "void-(Action action)",
            addItem: "void-(Item item)",
            addMenu: "void-(Menu menu)",
            dismiss: "void-()",
            insertAction: "void-(int index, Action action)",
            insertItem: "void-(int index, Item item)",
            insertMenu: "void-(int index, Menu menu)",
            itemAt: "Item-(int index)",
            menuAt: "Menu-(int index)",
            moveItem: "void-(int from, int to)",
            popup: [
                "void-(real x, real y, MenuItem item)",
                "void-(Item parent, real x, real y, MenuItem item)",
                "void-(point pos, MenuItem item)",
                "void-(Item parent, point pos, MenuItem item)",
                "void-(MenuItem item)",
                "void-(Item parent, MenuItem item)",
            ],
            removeAction: "void-(Action action)",
            removeItem: "void-(Item item)",
            removeMenu: "void-(Menu menu)",
            takeAction: "Action-(int index)",
            takeItem: "MenuItem-(int index)",
            takeMenu: "Menu-(int index)",
        },
        inherit: "Popup",
    },
    Window: {
        properties: {
            active: "bool",
            activeFocusItem: "Item",
            color: "color",
            contentItem: "Item",
            contentOrientation: "Qt::ScreenOrientation",
            data: "list<Object>",
            flags: "Qt::WindowFlags",
            height: "int",
            maximumHeight: "int",
            maximumWidth: "int",
            minimumHeight: "int",
            minimumWidth: "int",
            modality: "Qt::WindowModality",
            opacity: "real",
            screen: "variant",
            title: "string",
            transientParent: "QWindow",
            visibility: "QWindow::Visibility",
            visible: "bool",
            width: "int",
            window: "Window",
            x: "int",
            y: "int",
        },
        signals: {
            afterAnimating: "void-()",
            closing: "void-(CloseEvent close)",
            frameSwapped: "void-()",
            sceneGraphError: "void-(SceneGraphError error, QString message)",
        },
        methods: {
            alert: "void-(int msec)",
            close: "void-()",
            hide: "void-()",
            lower: "void-()",
            raise: "void-()",
            requestActivate: "void-()",
            show: "void-()",
            showFullScreen: "void-()",
            showMaximized: "void-()",
            showMinimized: "void-()",
            showNormal: "void-()",
        },
        inherit: "QtObject",
    },
    ApplicationWindow: {
        properties: {
            activeFocusControl: "Control",
            background: "Item",
            contentData: "list<Object>",
            contentItem: "Item",
            font: "font",
            footer: "Item",
            header: "Item",
            locale: "Locale",
            menuBar: "Item",
            palette: "palette",
        },
        signals: {},
        methods: {},
        inherit: "Window",
    },
    Text: {
        properties: {
            advance: "size",
            antialiasing: "bool",
            baseUrl: "url",
            bottomPadding: "real",
            clip: "bool",
            color: "color",
            contentHeight: "real",
            contentWidth: "real",
            effectiveHorizontalAlignment: "enumeration",
            elide: "enumeration",
            font: {
                bold: "bool",
                capitalization: "enumeration",
                family: "string",
                hintingPreference: "enumeration",
                italic: "bool",
                kerning: "bool",
                letterSpacing: "real",
                pixelSize: "int",
                pointSize: "real",
                preferShaping: "bool",
                strikeout: "bool",
                styleName: "string",
                underline: "bool",
                weight: "enumeration",
                wordSpacing: "real",
            },
            fontInfo: {
                bold: "bool",
                family: "string",
                italic: "bool",
                pixelSize: "string",
                pointSize: "real",
                styleName: "string",
                weight: "int",
            },
            fontSizeMode: "enumeration",
            horizontalAlignment: "enumeration",
            hoveredLink: "string",
            leftPadding: "real",
            lineCount: "int",
            lineHeight: "real",
            lineHeightMode: "enumeration",
            linkColor: "color",
            maximumLineCount: "int",
            minimumPixelSize: "int",
            minimumPointSize: "int",
            padding: "real",
            renderType: "enumeration",
            rightPadding: "real",
            style: "enumeration",
            styleColor: "color",
            text: "string",
            textFormat: "enumeration",
            topPadding: "real",
            truncated: "bool",
            verticalAlignment: "enumeration",
            wrapMode: "enumeration",
        },
        signals: {
            lineLaidOut: "void-(object line)",
            linkActivated: "void-(string link)",
            linkHovered: "void-(string link)",
        },
        methods: {
            forceLayout: "voide()",
            linkAt: "voide(real x, real y)",
        },
        doc: {
            kind: "markdown",
            value: `Text items can display both plain and rich text. For example, red text with a specific font and size can be defined like this:

    Text {
      text: "Hello World!"
      font.family: "Helvetica"
      font.pointSize: 24
      color: "red"
    }`,
        },
        inherit: "Item",
    },
    TextInput: {
        properties: {
            acceptableInput: "bool",
            activeFocusOnPress: "bool",
            autoScroll: "bool",
            bottomPadding: "real",
            canPaste: "bool",
            canRedo: "bool",
            canUndo: "bool",
            color: "color",
            contentHeight: "real",
            contentWidth: "real",
            cursorDelegate: "Component",
            cursorPosition: "int",
            cursorRectangle: "rectangle",
            cursorVisible: "bool",
            displayText: "string",
            echoMode: "enumeration",
            effectiveHorizontalAlignment: "enumeration",
            font: {
                bold: "bool",
                capitalization: "enumeration",
                family: "string",
                hintingPreference: "enumeration",
                italic: "bool",
                kerning: "bool",
                letterSpacing: "real",
                pixelSize: "int",
                pointSize: "real",
                preferShaping: "bool",
                strikeout: "bool",
                styleName: "string",
                underline: "bool",
                weight: "enumeration",
                wordSpacing: "real",
            },
            horizontalAlignment: "enumeration",
            inputMask: "string",
            inputMethodComposing: "bool",
            inputMethodHints: "enumeration",
            leftPadding: "real",
            length: "int",
            maximumLength: "int",
            mouseSelectionMode: "enumeration",
            overwriteMode: "bool",
            padding: "real",
            passwordCharacter: "string",
            passwordMaskDelay: "int",
            persistentSelection: "bool",
            preeditText: "string",
            readOnly: "bool",
            renderType: "enumeration",
            rightPadding: "real",
            selectByMouse: "bool",
            selectedText: "string",
            selectedTextColor: "color",
            selectionColor: "color",
            selectionEnd: "int",
            selectionStart: "int",
            text: "string",
            topPadding: "real",
            validator: "Validator",
            verticalAlignment: "enumeration",
            wrapMode: "enumeration",
        },
        signals: {
            accepted: "void-()",
            editingFinished: "void-()",
            textEdited: "void-()",
        },
        methods: {
            clear: "void-()",
            copy: "void-()",
            cut: "void-()",
            deselect: "void-()",
            ensureVisible: "void-(int position)",
            getText: "string-(int start, int end)",
            insert: "void-(int position, string text)",
            isRightToLeft: "void-(int start, int end)",
            moveCursorSelection: "void-(int position, SelectionMode mode)",
            paste: "void-()",
            positionAt: "int-(real x, real y, CursorPosition position)",
            positionToRectangle: "rect-(int pos)",
            redo: "void-()",
            remove: "void-(int start, int end)",
            select: "void-(int start, int end)",
            selectAll: "void-()",
            selectWord: "void-()",
            undo: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The TextInput type displays a single line of editable plain text.

  TextInput is used to accept a line of text input. Input constraints can be placed on a TextInput item (for example, through a validator or inputMask), and setting echoMode to an appropriate value enables TextInput to be used for a password input field.

  On macOS, the Up/Down key bindings for Home/End are explicitly disabled. If you want such bindings (on any platform), you will need to construct them in QML.`,
        },
        inherit: "Item",
    },
    CheckBox: {
        properties: {
            checkState: "enumeration",
            nextCheckState: "function",
            tristate: "bool",
        },
        signals: {},
        methods: {},
        inherit: "AbstractButton",
    },
    ColumnLayout: {
        properties: {
            layoutDirection: "enumeration",
            spacing: "real",
            Layout: {
                minimumWidth: "int",
                minimumHeight: "int",
                preferredWidth: "int",
                preferredHeight: "int",
                maximumWidth: "int",
                maximumHeight: "int",
                fillWidth: "int",
                fillHeight: "int",
                alignment: "int",
                margins: "int",
                leftMargin: "int",
                rightMargin: "int",
                topMargin: "int",
                bottomMargin: "int",
            },
        },
        signals: {},
        methods: {},
        inherit: "Item",
    },
    RowLayout: {
        properties: {
            layoutDirection: "enumeration",
            spacing: "real",
            Layout: {
                minimumWidth: "int",
                minimumHeight: "int",
                preferredWidth: "int",
                preferredHeight: "int",
                maximumWidth: "int",
                maximumHeight: "int",
                fillWidth: "int",
                fillHeight: "int",
                alignment: "int",
                margins: "int",
                leftMargin: "int",
                rightMargin: "int",
                topMargin: "int",
                bottomMargin: "int",
            },
        },
        signals: {},
        methods: {},
        inherit: "Item",
    },
    GridLayout: {
        properties: {
            columnSpacing: "real",
            columns: "int",
            flow: "enumeration",
            layoutDirection: "enumeration",
            rowSpacing: "real",
            rows: "int",
            Layout: {
                row: "int",
                column: "int",
                rowSpan: "int",
                columnSpan: "int",
                minimumWidth: "int",
                minimumHeight: "int",
                preferredWidth: "int",
                preferredHeight: "int",
                maximumWidth: "int",
                maximumHeight: "int",
                fillWidth: "int",
                fillHeight: "int",
                alignment: "int",
                margins: "int",
                leftMargin: "int",
                rightMargin: "int",
                topMargin: "int",
                bottomMargin: "int",
            },
        },
        signals: {},
        methods: {},
        inherit: "Item",
        doc: {
            kind: "markdown",
            value: `If the GridLayout is resized, all items in the layout will be rearranged. It is similar to the widget-based QGridLayout. All visible children of the GridLayout element will belong to the layout. If you want a layout with just one row or one column, you can use the RowLayout or ColumnLayout. These offer a bit more convenient API, and improve readability.

  By default items will be arranged according to the flow property. The default value of the flow property is GridLayout.LeftToRight.

  If the columns property is specified, it will be treated as a maximum limit of how many columns the layout can have, before the auto-positioning wraps back to the beginning of the next row. The columns property is only used when flow is GridLayout.LeftToRight.`,
        },
    },
    StackLayout: {
        properties: {
            count: "int",
            currentIndex: "int",
            Layout: {
                minimumWidth: "int",
                minimumHeight: "int",
                preferredWidth: "int",
                preferredHeight: "int",
                maximumWidth: "int",
                maximumHeight: "int",
                fillWidth: "int",
                fillHeight: "int",
            },
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `he current visible item can be modified by setting the currentIndex property. The index corresponds to the order of the StackLayout's children.

  In contrast to most other layouts, child Items' Layout.fillWidth and Layout.fillHeight properties default to true. As a consequence, child items are by default filled to match the size of the StackLayout as long as their Layout.maximumWidth or Layout.maximumHeight does not prevent it.

  Items are added to the layout by reparenting the item to the layout. Similarly, removal is done by reparenting the item from the layout. Both of these operations will affect the layout's count property.

  The following code will create a StackLayout where only the 'plum' rectangle is visible.

      StackLayout {
        id: layout
        anchors.fill: parent
        currentIndex: 1
        Rectangle {
          color: 'teal'
          implicitWidth: 200
          implicitHeight: 200
        }
        Rectangle {
          color: 'plum'
          implicitWidth: 300
          implicitHeight: 200
        }
      }
      `,
        },
        inherit: "Item",
    },
    StackView: {
        properties: {
            busy: "bool",
            currentItem: "Item",
            depth: "int",
            empty: "bool",
            initialItem: "var",
            popEnter: "Transition",
            popExit: "Transition",
            pushEnter: "Transition",
            pushExit: "Transition",
            replaceEnter: "Transition",
            replaceExit: "Transition",
            index: "int",
            status: "enumeration",
            view: "StackView",
            visible: "bool",
        },
        signals: {
            activated: "void-()",
            activating: "void-()",
            deactivated: "void-()",
            deactivating: "void-()",
            removed: "void-()",
        },
        methods: {
            clear: "void-(transition)",
            find: "Item-(callback, behavior)",
            get: "Item-(index, behavior)",
            pop: "Item-(item, operation)",
            push: "Item-(item, properties, operation)",
            replace: "Item-(target, item, properties, operation)",
        },
        doc: {
            kind: "markdown",
            value: `StackView can be used with a set of inter-linked information pages. For example, an email application with separate views to list the latest emails, view a specific email, and list/view the attachments. The email list view is pushed onto the stack as users open an email, and popped out as they choose to go back.`,
        },
        inherit: "Control",
    },
    AnimatedSprite: {
        properties: {
            currentFrame: "int",
            finishBehavior: "enumeration",
            frameCount: "int",
            frameDuration: "int",
            frameHeight: "int",
            frameRate: "qreal",
            frameSync: "bool",
            frameWidth: "int",
            frameX: "int",
            frameY: "int",
            interpolate: "bool",
            loops: "int",
            paused: "bool",
            reverse: "bool",
            running: "bool",
            source: "url",
        },
        signals: {
            finished: "void-()",
        },
        methods: {
            advance: "int-()",
            pause: "int-()",
            restart: "int-()",
            resume: "int-()",
            start: "void-()",
            stop: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `AnimatedSprite provides rendering and control over animations which are provided as multiple frames in the same image file. You can play it at a fixed speed, at the frame rate of your display, or manually advance and control the progress.`,
        },
        inherit: "Item",
    },
    BorderImage: {
        properties: {
            asynchronous: "bool",
            border: {
                bottom: "int",
                left: "int",
                right: "int",
                top: "int",
            },
            cache: "bool",
            currentFrame: "int",
            frameCount: "int",
            horizontalTileMode: "enumeration",
            mirror: "bool",
            progress: "real",
            smooth: "bool",
            source: "url",
            sourceSize: "QSize",
            status: "enumeration",
            verticalTileMode: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The BorderImage type is used to create borders out of images by scaling or tiling parts of each image.

  A BorderImage breaks a source image, specified using the source property, into 9 regions`,
        },
        inherit: "Item",
    },
    Canvas: {
        properties: {
            available: "bool",
            canvasSize: "size",
            context: "object",
            contextType: "string",
            renderStrategy: "enumeration",
            renderTarget: "enumeration",
        },
        signals: {
            imageLoaded: "void-()",
            paint: "void-(rect region)",
            painted: "void-()",
        },
        methods: {
            cancelRequestAnimationFrame: "void-(int handle)",
            getContext: "object-(string contextId, ... args)",
            isImageError: "void-(url image)",
            isImageLoaded: "void-(url image)",
            isImageLoading: "void-(url image)",
            loadImage: "void-(url image)",
            markDirty: "void-(rect area)",
            requestAnimationFrame: "int-(callback)",
            requestPaint: "void-()",
            save: "bool-(string filename)",
            toDataURL: "string-(string mimeType)",
            unloadImage: "void-(url image)",
        },
        doc: {
            kind: "markdown",
            value: `The Canvas item allows drawing of straight and curved lines, simple and complex shapes, graphs, and referenced graphic images. It can also add text, colors, shadows, gradients, and patterns, and do low level pixel operations. The Canvas output may be saved as an image file or serialized to a URL.

  Rendering to the Canvas is done using a Context2D object, usually as a result of the paint signal.

  To define a drawing area in the Canvas item set the width and height properties.`,
        },
        inherit: "Item",
    },
    Column: {
        properties: {
            add: "Transition",
            bottomPadding: "real",
            leftPadding: "real",
            move: "Transition",
            padding: "real",
            populate: "Transition",
            rightPadding: "real",
            spacing: "real",
            topPadding: "real",
        },
        signals: {
            positioningComplete: "void-()",
        },
        methods: {
            forceLayout: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `Column is a type that positions its child items along a single column. It can be used as a convenient way to vertically position a series of items without using anchors.

  Below is a Column that contains three rectangles of various sizes:


      Column {
        spacing: 2

        Rectangle { color: "red"; width: 50; height: 50 }
        Rectangle { color: "green"; width: 20; height: 50 }
        Rectangle { color: "blue"; width: 50; height: 20 }
      }
      `,
        },
        inherit: "Item",
    },
    DropArea: {
        properties: {
            containsDrag: "bool",
            drag: {
                x: "qreal",
                y: "qreal",
                source: "Object",
            },
            keys: "stringlist",
        },
        signals: {
            dropped: "void-(DragEvent drop)",
            entered: "void-(DragEvent drag)",
            exited: "void-()",
            positionChanged: "void-(DragEvent drag)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `A DropArea is an invisible item which receives events when other items are dragged over it.

  The Drag attached property can be used to notify the DropArea when an Item is dragged over it.

  The keys property can be used to filter drag events which don't include a matching key.

  The drag.source property is communicated to the source of a drag event as the recipient of a drop on the drag target.
    `,
        },
        inherit: "Item",
    },
    Flickable: {
        properties: {
            atXBeginning: "bool",
            atXEnd: "bool",
            atYBeginning: "bool",
            atYEnd: "bool",
            bottomMargin: "real",
            boundsBehavior: "enumeration",
            boundsMovement: "enumeration",
            contentHeight: "real",
            contentItem: "Item",
            contentWidth: "real",
            contentX: "real",
            contentY: "real",
            dragging: "bool",
            draggingHorizontally: "bool",
            draggingVertically: "bool",
            flickDeceleration: "real",
            flickableDirection: "enumeration",
            flicking: "bool",
            flickingHorizontally: "bool",
            flickingVertically: "bool",
            horizontalOvershoot: "real",
            horizontalVelocity: "real",
            interactive: "bool",
            leftMargin: "real",
            maximumFlickVelocity: "real",
            moving: "bool",
            movingHorizontally: "bool",
            movingVertically: "bool",
            originX: "real",
            originY: "real",
            pixelAligned: "bool",
            pressDelay: "int",
            rebound: "Transition",
            rightMargin: "real",
            synchronousDrag: "bool",
            topMargin: "real",
            verticalOvershoot: "real",
            verticalVelocity: "real",
            visibleArea: {
                heightRatio: "real",
                widthRatio: "real",
                xPosition: "real",
                yPosition: "real",
            },
        },
        signals: {
            flickEnded: "void-()",
            flickStarted: "void-()",
            movementEnded: "void-()",
            movementStarted: "void-()",
        },
        methods: {
            cancelFlick: "void-()",
            flick: "void-(qreal xVelocity, qreal yVelocity)",
            resizeContent: "void-(real width, real height, QPointF center)",
            returnToBounds: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The Flickable item places its children on a surface that can be dragged and flicked, causing the view onto the child items to scroll. This behavior forms the basis of Items that are designed to show large numbers of child items, such as ListView and GridView.

  In traditional user interfaces, views can be scrolled using standard controls, such as scroll bars and arrow buttons. In some situations, it is also possible to drag the view directly by pressing and holding a mouse button while moving the cursor. In touch-based user interfaces, this dragging action is often complemented with a flicking action, where scrolling continues after the user has stopped touching the view.

  Flickable does not automatically clip its contents. If it is not used as a full-screen item, you should consider setting the clip property to true.`,
        },
        inherit: "Item",
    },
    Flipable: {
        properties: {
            back: "Item",
            front: "Item",
            side: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Flipable is an item that can be visibly "flipped" between its front and back sides, like a card. It may used together with Rotation, State and Transition types to produce a flipping effect.

  The front and back properties are used to hold the items that are shown respectively on the front and back sides of the flipable item.`,
        },
        inherit: "Item",
    },
    Flow: {
        properties: {
            add: "Transition",
            bottomPadding: "real",
            effectiveLayoutDirection: "enumeration",
            flow: "enumeration",
            layoutDirection: "enumeration",
            leftPadding: "real",
            move: "Transition",
            padding: "real",
            populate: "Transition",
            rightPadding: "real",
            spacing: "real",
            topPadding: "real",
        },
        signals: {
            positioningComplete: "void-()",
        },
        methods: {
            forceLayout: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The Flow item positions its child items like words on a page, wrapping them to create rows or columns of items.

  Below is a Flow that contains various Text items:

    Flow {
      anchors.fill: parent
      anchors.margins: 4
      spacing: 10

      Text { text: "Text"; font.pixelSize: 40 }
      Text { text: "items"; font.pixelSize: 40 }
      Text { text: "flowing"; font.pixelSize: 40 }
      Text { text: "inside"; font.pixelSize: 40 }
      Text { text: "a"; font.pixelSize: 40 }
      Text { text: "Flow"; font.pixelSize: 40 }
      Text { text: "item"; font.pixelSize: 40 }
    }`,
        },
        inherit: "Item",
    },
    FocusScope: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Focus scopes assist in keyboard focus handling when building reusable QML components. All the details are covered in the keyboard focus documentation.`,
        },
        inherit: "Item",
    },
    Grid: {
        properties: {
            add: "Transition",
            bottomPadding: "real",
            columnSpacing: "qreal",
            columns: "int",
            effectiveHorizontalItemAlignment: "enumeration",
            effectiveLayoutDirection: "enumeration",
            flow: "enumeration",
            horizontalItemAlignment: "enumeration",
            layoutDirection: "enumeration",
            leftPadding: "real",
            move: "Transition",
            padding: "real",
            populate: "Transition",
            rightPadding: "real",
            rowSpacing: "qreal",
            rows: "int",
            spacing: "qreal",
            topPadding: "real",
            verticalItemAlignment: "enumeration",
        },
        signals: {
            positioningComplete: "void-()",
        },
        methods: {
            forceLayout: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `Grid is a type that positions its child items in grid formation.

  A Grid creates a grid of cells that is large enough to hold all of its child items, and places these items in the cells from left to right and top to bottom. Each item is positioned at the top-left corner of its cell with position (0, 0).

  A Grid defaults to four columns, and creates as many rows as are necessary to fit all of its child items. The number of rows and columns can be constrained by setting the rows and columns properties.

  For example, below is a Grid that contains five rectangles of various sizes:

  import QtQuick 2.0

    Grid {
      columns: 3
      spacing: 2
      Rectangle { color: "red"; width: 50; height: 50 }
      Rectangle { color: "green"; width: 20; height: 50 }
      Rectangle { color: "blue"; width: 50; height: 20 }
      Rectangle { color: "cyan"; width: 50; height: 50 }
      Rectangle { color: "magenta"; width: 10; height: 10 }
    }`,
        },
        inherit: "Item",
    },
    Image: {
        properties: {
            asynchronous: "bool",
            autoTransform: "bool",
            cache: "bool",
            currentFrame: "int",
            fillMode: "enumeration",
            frameCount: "int",
            horizontalAlignment: "enumeration",
            mipmap: "bool",
            mirror: "bool",
            paintedHeight: "real",
            paintedWidth: "real",
            progress: "real",
            smooth: "bool",
            source: "url",
            sourceClipRect: "rect",
            sourceSize: "size",
            status: "enumeration",
            verticalAlignment: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The Image type displays an image.

  The source of the image is specified as a URL using the source property. Images can be supplied in any of the standard image formats supported by Qt, including bitmap formats such as PNG and JPEG, and vector graphics formats such as SVG. If you need to display animated images, use AnimatedSprite or AnimatedImage.

  If the width and height properties are not specified, the Image automatically uses the size of the loaded image. By default, specifying the width and height of the item causes the image to be scaled to that size. This behavior can be changed by setting the fillMode property, allowing the image to be stretched and tiled instead.

    import QtQuick 2.0

    Image { source: "pics/qtlogo.png" }`,
        },
        inherit: "Item",
    },
    Loader: {
        properties: {
            active: "bool",
            asynchronous: "bool",
            item: "object",
            progress: "real",
            source: "url",
            sourceComponent: "Component",
            status: "enumeration",
        },
        signals: {
            loaded: "void-()",
        },
        methods: {
            setSource: "object-(url source, object properties)",
        },
        doc: {
            kind: "markdown",
            value: `Loader is used to dynamically load QML components.

  Loader can load a QML file (using the source property) or a Component object (using the sourceComponent property). It is useful for delaying the creation of a component until it is required: for example, when a component should be created on demand, or when a component should not be created unnecessarily for performance reasons.

  Here is a Loader that loads "Page1.qml" as a component when the MouseArea is clicked:

    import QtQuick 2.0

    Item {
      width: 200; height: 200

      Loader { id: pageLoader }

      MouseArea {
        anchors.fill: parent
        onClicked: pageLoader.source = "Page1.qml"
      }
    }`,
        },
        inherit: "Item",
    },
    MultiPointTouchArea: {
        properties: {
            maximumTouchPoints: "int",
            minimumTouchPoints: "int",
            mouseEnabled: "bool",
            touchPoints: "list<TouchPoint>",
        },
        signals: {
            canceled: "void-(list<TouchPoint> touchPoints)",
            gestureStarted: "void-(GestureEvent gesture)",
            pressed: "void-(list<TouchPoint> touchPoints)",
            released: "void-(list<TouchPoint> touchPoints)",
            touchUpdated: "void-(list<TouchPoint> touchPoints)",
            updated: "void-(list<TouchPoint> touchPoints)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `A MultiPointTouchArea is an invisible item that is used to track multiple touch points.

  The Item::enabled property is used to enable and disable touch handling. When disabled, the touch area becomes transparent to mouse and touch events.

  By default, the mouse will be handled the same way as a single touch point, and items under the touch area will not receive mouse events because the touch area is handling them. But if the mouseEnabled property is set to false, it becomes transparent to mouse events so that another mouse-sensitive Item (such as a MouseArea) can be used to handle mouse interaction separately.

  MultiPointTouchArea can be used in two ways:

  setting touchPoints to provide touch point objects with properties that can be bound to
  using the onTouchUpdated or onPressed, onUpdated and onReleased handlers
  While a MultiPointTouchArea can take exclusive ownership of certain touch points, it is also possible to have multiple MultiPointTouchAreas active at the same time, each operating on a different set of touch points.`,
        },
        inherit: "Item",
    },
    ParticlePainter: {
        properties: {
            groups: "list<string>",
            system: "ParticleSystem",
        },
        signals: {},
        methods: {},
        inherit: "Item",
    },
    PathView: {
        properties: {
            cacheItemCount: "int",
            count: "int",
            currentIndex: "int",
            currentItem: "Item",
            delegate: "Component",
            dragMargin: "real",
            dragging: "bool",
            flickDeceleration: "real",
            flicking: "bool",
            highlight: "Component",
            highlightItem: "Item",
            highlightMoveDuration: "int",
            highlightRangeMode: "enumeration",
            interactive: "bool",
            maximumFlickVelocity: "real",
            model: "model",
            movementDirection: "enumeration",
            moving: "bool",
            offset: "real",
            path: "Path",
            pathItemCount: "int",
            preferredHighlightBegin: "real",
            preferredHighlightEnd: "real",
            snapMode: "enumeration",
            sCurrentItem: "bool",
            onPath: "bool",
            view: "PathView",
        },
        signals: {
            dragEnded: "void-()",
            dragStarted: "void-()",
            flickEnded: "void-()",
            flickStarted: "void-()",
            movementEnded: "void-()",
            movementStarted: "void-()",
        },
        methods: {
            decrementCurrentIndex: "void-()",
            incrementCurrentIndex: "void-()",
            indexAt: "int-(real x, real y)",
            itemAt: "Item-(real x, real y)",
            positionViewAtIndex: "void-(int index, PositionMode mode)",
        },
        doc: {
            kind: "markdown",
            value: `A PathView displays data from models created from built-in QML types like ListModel and XmlListModel, or custom model classes defined in C++ that inherit from QAbstractListModel.

  The view has a model, which defines the data to be displayed, and a delegate, which defines how the data should be displayed. The delegate is instantiated for each item on the path. The items may be flicked to move them along the path.

  For example, if there is a simple list model defined in a file ContactModel.qml like this:

    import QtQuick 2.0

    ListModel {
      ListElement {
        name: "Bill Jones"
        icon: "pics/qtlogo.png"
      }
      ListElement {
        name: "Jane Doe"
        icon: "pics/qtlogo.png"
      }
      ListElement {
        name: "John Smith"
        icon: "pics/qtlogo.png"
      }
    }`,
        },
        inherit: "Item",
    },
    PinchArea: {
        properties: {
            enabled: "bool",
            pinch: {
                active: "bool",
                dragAxis: "enumeration",
                maximumRotation: "real",
                maximumScale: "real",
                maximumX: "real",
                maximumY: "real",
                minimumRotation: "real",
                minimumScale: "real",
                minimumX: "real",
                minimumY: "real",
                target: "Item",
            },
        },
        signals: {
            pinchFinished: "void-(PinchEvent pinch)",
            pinchStarted: "void-(PinchEvent pinch)",
            pinchUpdated: "void-(PinchEvent pinch)",
            smartZoom: "void-(PinchEvent pinch)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `The PinchArea type was added in QtQuick 1.1

  A PinchArea is an invisible item that is typically used in conjunction with a visible item in order to provide pinch gesture handling for that item.

  The enabled property is used to enable and disable pinch handling for the proxied item. When disabled, the pinch area becomes transparent to mouse/touch events.`,
        },
        inherit: "Item",
    },
    Repeater: {
        properties: {
            count: "int",
            delegate: "Component",
            model: "any",
        },
        signals: {
            itemAdded: "void-(int index, Item item)",
            itemRemoved: "void-(int index, Item item)",
        },
        methods: {
            itemAt: "Item-(index)",
        },
        doc: {
            kind: "markdown",
            value: `The Repeater type is used to create a large number of similar items. Like other view types, a Repeater has a model and a delegate: for each entry in the model, the delegate is instantiated in a context seeded with data from the model. A Repeater item is usually enclosed in a positioner type such as Row or Column to visually position the multiple delegate items created by the Repeater.

  The following Repeater creates three instances of a Rectangle item within a Row:

    import QtQuick 2.0

    Row {
      Repeater {
        model: 3
        Rectangle {
          width: 100; height: 40
          border.width: 1
          color: "yellow"
        }
      }
    }`,
        },
        inherit: "Item",
    },
    Row: {
        properties: {
            add: "Transition",
            bottomPadding: "real",
            effectiveLayoutDirection: "enumeration",
            layoutDirection: "enumeration",
            leftPadding: "real",
            move: "Transition",
            padding: "real",
            populate: "Transition",
            rightPadding: "real",
            spacing: "real",
            topPadding: "real",
        },
        signals: {
            positioningComplete: "void-()",
        },
        methods: {
            forceLayout: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `Row is a type that positions its child items along a single row. It can be used as a convenient way to horizontally position a series of items without using anchors.

  Below is a Row that contains three rectangles of various sizes:

    import QtQuick 2.0

    Row {
      spacing: 2
      Rectangle { color: "red"; width: 50; height: 50 }
      Rectangle { color: "green"; width: 20; height: 50 }
      Rectangle { color: "blue"; width: 50; height: 20 }
    }`,
        },
        inherit: "Item",
    },
    ShaderEffect: {
        properties: {
            blending: "bool",
            cullMode: "enumeration",
            fragmentShader: "string",
            log: "string",
            mesh: "variant",
            status: "enumeration",
            supportsAtlasTextures: "bool",
            vertexShader: "string",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The ShaderEffect type applies a custom vertex and fragment (pixel) shader to a rectangle. It allows you to write effects such as drop shadow, blur, colorize and page curl directly in QML.`,
        },
        inherit: "Item",
    },
    ShaderEffectSource: {
        properties: {
            format: "enumeration",
            hideSource: "bool",
            live: "bool",
            mipmap: "bool",
            recursive: "bool",
            samples: "int",
            sourceItem: "Item",
            sourceRect: "rect",
            textureMirroring: "enumeration",
            textureSize: "size",
            wrapMode: "enumeration",
        },
        signals: {},
        methods: {
            scheduleUpdate: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The ShaderEffectSource type renders sourceItem into a texture and displays it in the scene. sourceItem is drawn into the texture as though it was a fully opaque root item. Thus sourceItem itself can be invisible, but still appear in the texture`,
        },
        inherit: "Item",
    },
    Shape: {
        properties: {
            asynchronous: "bool",
            containsMode: "enumeration",
            data: "list<Object>",
            rendererType: "enumeration",
            status: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Renders a path either by generating geometry via QPainterPath and manual triangulation or by using a GPU vendor extension like GL_NV_path_rendering.

  This approach is different from rendering shapes via QQuickPaintedItem or the 2D Canvas because the path never gets rasterized in software. Therefore Shape is suitable for creating shapes spreading over larger areas of the screen, avoiding the performance penalty for texture uploads or framebuffer blits. In addition, the declarative API allows manipulating, binding to, and even animating the path element properties like starting and ending position, the control points, and so on.

  The types for specifying path elements are shared between PathView and Shape. However, not all Shape implementations support all path element types, while some may not make sense for PathView. Shape's currently supported subset is: PathMove, PathLine, PathQuad, PathCubic, PathArc, and PathSvg.

  See Path for a detailed overview of the supported path elements.

    Shape {
      width: 200
      height: 150
      anchors.centerIn: parent
      ShapePath {
        strokeWidth: 4
        strokeColor: "red"
        fillGradient: LinearGradient {
          x1: 20; y1: 20
          x2: 180; y2: 130
          GradientStop { position: 0; color: "blue" }
          GradientStop { position: 0.2; color: "green" }
          GradientStop { position: 0.4; color: "red" }
          GradientStop { position: 0.6; color: "yellow" }
          GradientStop { position: 1; color: "cyan" }
        }
        strokeStyle: ShapePath.DashLine
        dashPattern: [ 1, 4 ]
        startX: 20; startY: 20
        PathLine { x: 180; y: 130 }
        PathLine { x: 20; y: 130 }
        PathLine { x: 20; y: 20 }
      }
    }`,
        },
        inherit: "Item",
    },
    SpriteSequence: {
        properties: {
            currentSprite: "string",
            goalSprite: "string",
            interpolate: "bool",
            running: "bool",
            sprites: "list<Sprite>",
        },
        signals: {},
        methods: {
            jumpTo: "void-(string sprite)",
        },
        doc: {
            kind: "markdown",
            value: `SpriteSequence renders and controls a list of animations defined by Sprite types.`,
        },
        inherit: "Item",
    },
    TextEdit: {
        properties: {
            activeFocusOnPress: "bool",
            baseUrl: "url",
            bottomPadding: "real",
            canPaste: "bool",
            canRedo: "bool",
            canUndo: "bool",
            color: "color",
            contentHeight: "real",
            contentWidth: "real",
            cursorDelegate: "Component",
            cursorPosition: "int",
            cursorRectangle: "rectangle",
            cursorVisible: "bool",
            effectiveHorizontalAlignment: "enumeration",
            font: {
                bold: "bool",
                capitalization: "enumeration",
                family: "string",
                hintingPreference: "enumeration",
                italic: "bool",
                kerning: "bool",
                letterSpacing: "real",
                pixelSize: "int",
                pointSize: "real",
                preferShaping: "bool",
                strikeout: "bool",
                styleName: "string",
                underline: "bool",
                weight: "enumeration",
                wordSpacing: "real",
            },
            horizontalAlignment: "enumeration",
            hoveredLink: "string",
            inputMethodComposing: "bool",
            inputMethodHints: "enumeration",
            leftPadding: "real",
            length: "int",
            lineCount: "int",
            mouseSelectionMode: "enumeration",
            overwriteMode: "bool",
            padding: "real",
            persistentSelection: "bool",
            preeditText: "string",
            readOnly: "bool",
            renderType: "enumeration",
            rightPadding: "real",
            selectByKeyboard: "bool",
            selectByMouse: "bool",
            selectedText: "string",
            selectedTextColor: "color",
            selectionColor: "color",
            selectionEnd: "int",
            selectionStart: "int",
            tabStopDistance: "real",
            text: "string",
            textDocument: "TextDocument",
            textFormat: "enumeration",
            textMargin: "real",
            topPadding: "real",
            verticalAlignment: "enumeration",
            wrapMode: "enumeration",
        },
        signals: {
            editingFinished: "void-()",
            linkActivated: "void-(string link)",
            linkHovered: "void-(string link)",
        },
        methods: {
            append: "void-(string text)",
            clear: "void-()",
            copy: "void-()",
            cut: "void-()",
            deselect: "void-()",
            getFormattedText: "string-(int start, int end)",
            getText: "string-(int start, int end)",
            insert: "void-(int position, string text)",
            isRightToLeft: "void-(int start, int end)",
            linkAt: "void-(real x, real y)",
            moveCursorSelection: "void-(int position, SelectionMode mode)",
            paste: "void-()",
            positionAt: "int-(int x, int y)",
            positionToRectangle: "rectangle-(position)",
            redo: "void-()",
            remove: "string-(int start, int end)",
            select: "void-(int start, int end)",
            selectAll: "void-()",
            selectWord: "void-()",
            undo: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The TextEdit item displays a block of editable, formatted text.

  It can display both plain and rich text. For example:

    TextEdit {
      width: 240
      text: "<b>Hello</b> <i>World!</i>"
      font.family: "Helvetica"
      font.pointSize: 20
      color: "blue"
      focus: true
    }`,
        },
        inherit: "Item",
    },
};
exports.default = References;
//# sourceMappingURL=index.js.map