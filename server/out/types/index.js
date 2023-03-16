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
    AbstractActionInput: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The base class for the Action Input and all Aggregate Action Inputs.`,
        },
        inherit: "QtObject",
    },
    AbstractAnimation: {
        properties: {
            animationName: "string",
            animationType: "enumeration",
            duration: "real",
            position: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AbstractAnimation is an abstract base type for all animations. AbstractAnimation can not be directly instantiated, but rather through its subtypes. AbstractAnimation specifies common properties for all Qt3D animations, such as animation type, current position and animation duration, while leaving the actual animating for the subtypes.`,
        },
        inherit: "QtObject",
    },
    AbstractAxis: {
        properties: {
            alignment: "alignment",
            color: "color",
            gridLineColor: "color",
            gridVisible: "bool",
            labelsAngle: "int",
            labelsColor: "color",
            labelsFont: "font",
            labelsVisible: "bool",
            lineVisible: "bool",
            minorGridLineColor: "color",
            minorGridVisible: "bool",
            orientation: "Qt.Orientation",
            reverse: "alignment",
            shadesBorderColor: "color",
            shadesColor: "color",
            shadesVisible: "bool",
            titleFont: "font",
            titleText: "string",
            titleVisible: "bool",
            visible: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Each series can be bound to only one horizontal and vertical axis.

  The properties and visibility of various axis elements, such as axis line, title, labels, grid lines, and shades, can be individually controlled.`,
        },
        inherit: "QtObject",
    },
    AbstractAxis3D: {
        properties: {
            autoAdjustRange: "bool",
            labelAutoRotation: "real",
            labels: "list",
            max: "real",
            min: "real",
            orientation: "AbstractAxis3D.AxisOrientation",
            title: "string",
            titleFixed: "bool",
            titleVisible: "bool",
            type: "AbstractAxis3D.AxisType",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type is uncreatable, but contains properties that are exposed via subtypes.

For AbstractAxis3D enums, see QAbstract3DAxis::AxisOrientation and QAbstract3DAxis::AxisType.`,
        },
        inherit: "QtObject",
    },
    AbstractAxisInput: {
        properties: {
            sourceDevice: "AbstractPhysicalDevice",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    AbstractBarSeries: {
        properties: {
            axisX: "AbstractAxis",
            axisXTop: "AbstractAxis",
            axisY: "AbstractAxis",
            axisYRight: "AbstractAxis",
            barWidth: "real",
            count: "int",
            labelsAngle: "real",
            labelsFormat: "string",
            labelsPosition: "enumeration",
            labelsPrecision: "real",
            labelsVisible: "bool",
        },
        signals: {
            barsetsAdded: "void-()",
            barsetsRemoved: "void-()",
            clicked: "void-(int index, BarSet barset)",
            doubleClicked: "void-(int index, BarSet barset)",
            hovered: "void-(bool status, int index, BarSet barset)",
            pressed: "void-(int index, BarSet barset)",
            released: "void-(int index, BarSet barset)",
        },
        methods: {
            append: "BarSet-(string label, VariantList values)",
            at: "BarSet-(int index)",
            clear: "void-()",
            insert: "BarSet-(int index, string label, VariantList values)",
            remove: "bool-(BarSet barset)",
        },
        doc: {
            kind: "markdown",
            value: `In bar charts, bars are defined as bar sets that contain one data value for each category. The position of a bar is specified by the category and its height by the data value. Bar series that contain multiple bar sets group together bars that belong to the same category. The way the bars are displayed is determined by the type chosen to create the bar chart: BarSeries, StackedBarSeries, PercentBarSeries, HorizontalBarSeries, HorizontalStackedBarSeries, or HorizontalPercentBarSeries.

  If a ValueAxis type is used instead of a BarCategoryAxis type for the main bar axis, the bars are grouped around the index value of the category.

  The following QML code snippet shows how to use the BarSeries and BarCategoryAxis type to create a simple bar chart:

  ChartView {
      title: "Bar series"
      anchors.fill: parent
      legend.alignment: Qt.AlignBottom
      antialiasing: true

      BarSeries {
          id: mySeries
          axisX: BarCategoryAxis { categories: ["2007", "2008", "2009", "2010", "2011", "2012" ] }
          BarSet { label: "Bob"; values: [2, 2, 3, 4, 5, 6] }
          BarSet { label: "Susan"; values: [5, 1, 2, 4, 1, 7] }
          BarSet { label: "James"; values: [3, 5, 8, 13, 5, 8] }
      }
  }`,
        },
        inherit: "AbstractSeries",
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
            canceled: "void-()",
            clicked: "void-()",
            doubleClicked: "void-()",
            pressAndHold: "void-()",
            pressed: "void-()",
            released: "void-()",
            toggled: "void-()",
        },
        methods: {
            toggle: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `AbstractButton provides the interface for controls with button-like behavior; for example, push buttons and checkable controls like radio buttons and check boxes. As an abstract control, it has no delegate implementations, leaving them to the types that derive from it.`,
        },
        inherit: "Control",
    },
    AbstractClipAnimator: {
        properties: {
            channelMapper: "ChannelMapper",
            clock: "Clock",
            loops: "int",
            normalizedTime: "real",
            running: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Subclasses of AbstractClipAnimator can be aggregated by an Entity to provide animation capabilities. The animator components provide an interface for controlling the animation (e.g. start, stop). Each animator type requires some form of animation data such as an AbstractAnimationClip as well as a ChannelMapper which describes how the channels in the animation clip should be mapped onto the properties of the objects you wish to animate.`,
        },
        inherit: "QtObject",
    },
    AbstractClipBlendNode: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Animation blend trees are used with a BlendedClipAnimator to dynamically blend a set of animation clips together. The way in which the blending of animation clips is performed is controlled by the structure of the blend tree and the properties on the nodes it contains.

  The leaf nodes in a blend tree are containers for the input animation clips. These clips can be baked clips read from file via AnimationClipLoader, or they can be clips that you build within your application with AnimatitonClip and AnimationClipData. To include a clip in your blend tree, wrap it in a ClipBlendValue node.

  The interior nodes of a blend tree represent blending operations that will be applied to their arguments which hold the input clips or even entire sub-trees of other blend tree nodes.`,
        },
        inherit: "QtObject",
    },
    AbstractDataProxy: {
        properties: {
            type: "AbstractDataProxy.DataType",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type is uncreatable, but contains properties that are exposed via the following subtypes: BarDataProxy, ScatterDataProxy, SurfaceDataProxy.`,
        },
        inherit: "QtObject",
    },
    AbstractGraph3D: {
        properties: {
            aspectRatio: "real",
            currentFps: "int",
            customItemList: "list<Custom3DItem>",
            horizontalAspectRatio: "real",
            inputHandler: "AbstractInputHandler3D",
            locale: "locale",
            margin: "real",
            measureFps: "bool",
            msaaSamples: "int",
            optimizationHints: "AbstractGraph3D.OptimizationHints",
            orthoProjection: "bool",
            polar: "bool",
            queriedGraphPosition: "vector3d",
            radialLabelOffset: "real",
            reflection: "bool",
            reflectivity: "real",
            scene: "Scene3D",
            selectedElement: "AbstractGraph3D.ElementType",
            selectionMode: "AbstractGraph3D.SelectionMode",
            shadowQuality: "AbstractGraph3D.ShadowQuality",
            shadowsSupported: "bool",
            theme: "Theme3D",
        },
        signals: {},
        methods: {
            addCustomItem: "int-(Custom3DItem item)",
            clearSelection: "void-()",
            releaseCustomItem: "void-(Custom3DItem item)",
            removeCustomItem: "void-(Custom3DItem item)",
            removeCustomItemAt: "void-(vector3d position)",
            removeCustomItems: "void-()",
            selectedAxis: "Abstract3DAxis-()",
            selectedCustomItem: "Custom3DItem-()",
            selectedCustomItemIndex: "int-()",
            selectedLabelIndex: "int-()",
        },
        doc: {
            kind: "markdown",
            value: `The base type for all 3D visualizations in QtDataVisualization.

  This type is uncreatable, but it contains properties that are shared between the 3D visualizations.`,
        },
        inherit: "QtObject",
    },
    AbstractInputHandler3D: {
        properties: {},
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    AbstractPhysicalDevice: {
        properties: {},
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    AbstractRayCaster: {
        properties: {
            filterMode: "enumeration",
            hits: "array",
            runMode: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AbstractRayCaster is an abstract base class for casting rays into a 3d scene. AbstractRayCaster can not be directly instantiated, but rather through its subclasses. QAbstractRayCaster specifies common properties for all ray casters, such as run mode and layer handling, while leaving the actual ray casting details to the subclasses.

  Ray castings differs from picking (using ObjectPicker) in that it does not require mouse events to trigger.

  By default, the instances of AbstractRayCaster are disabled. When enabled, the specified ray will be tested for intersecting objects at every frame. The AbstractRayCaster.hits property will be updated with the results of the ray casting, even if no objects are found.

  The Qt3D.Render::PickingSettings can be used to control the ray casting, such as which primitives are tested and how the results are returned.

  Furthermore, Qt3D.Render::Layer components can be used to control how entities, or entity sub-graphs, react to ray casting.

  Note: components derived from AbstractRayCaster should not be shared amount multiple entities.
  `,
        },
        inherit: "QtObject",
    },
    AbstractSeries: {
        properties: {
            name: "string",
            opacity: "real",
            type: "enumeration",
            useOpenGL: "bool",
            visible: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type cannot be instantiated directly. Instead, one of the following derived types should be used to create a series: LineSeries, AreaSeries, BarSeries, StackedBarSeries, PercentBarSeries, HorizontalBarSeries, HorizontalStackedBarSeries, HorizontalPercentBarSeries, PieSeries, ScatterSeries, SplineSeries, BoxPlotSeries, or CandlestickSeries.`,
        },
        inherit: "QtObject",
    },
    AbstractSkeleton: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Do not use this class directly. You should use SkeletonLoader if loading skeleton data from a file (most likely) or Skeleton if creating the skeleton and skinned mesh data yourself (mainly for people creating editors or tooling).`,
        },
        inherit: "Node",
    },
    AbstractTextureImage: {
        properties: {
            face: "enumeration",
            layer: "int",
            mipLevel: "int",
        },
        signals: {},
        methods: {},
        inherit: "Node",
    },
    Accelerometer: {
        properties: {
            accelerationMode: "AccelerationMode",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The Accelerometer element reports on linear acceleration along the X, Y and Z axes.

  This element wraps the QAccelerometer class. Please see the documentation for QAccelerometer for details.`,
        },
        inherit: "Sensor",
    },
    AccelerometerReading: {
        properties: {
            x: "qreal",
            y: "qreal",
            z: "qreal",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AccelerometerReading element holds the most recent Accelerometer reading.

  This element wraps the QAccelerometerReading class. Please see the documentation for QAccelerometerReading for details.

  This element cannot be directly created.`,
        },
        inherit: "SensorReading",
    },
    Accessible: {
        properties: {
            checkStateMixed: "bool",
            checkable: "bool",
            checked: "bool",
            defaultButton: "bool",
            description: "string",
            editable: "bool",
            focusable: "bool",
            focused: "bool",
            ignored: "bool",
            multiLine: "bool",
            name: "string",
            passwordEdit: "bool",
            pressed: "bool",
            readOnly: "bool",
            role: "enumeration",
            searchEdit: "bool",
            selectable: "bool",
            selectableText: "bool",
            selected: "bool",
        },
        signals: {
            decreaseAction: "void-()",
            increaseAction: "void-()",
            nextPageAction: "void-()",
            pressAction: "void-()",
            previousPageAction: "void-()",
            scrollDownAction: "void-()",
            scrollLeftAction: "void-()",
            scrollRightAction: "void-()",
            scrollUpAction: "void-()",
            toggleAction: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `This class is part of the Accessibility for Qt Quick Applications.

  Items the user interacts with or that give information to the user need to expose their information to the accessibility framework. Then assistive tools can make use of that information to enable users to interact with the application in various ways. This enables Qt Quick applications to be used with screen-readers for example.

  The most important properties are name, description and role.

  Example implementation of a simple button:

    Rectangle {
        id: myButton
        Text {
            id: label
            text: "next"
        }
        Accessible.role: Accessible.Button
        Accessible.name: label.text
        Accessible.description: "shows the next page"
        Accessible.onPressAction: {
            // do a button click
        }
    }`,
        },
        inherit: "QtObject",
    },
    Action: {
        properties: {
            checkable: "bool",
            checked: "bool",
            enabled: "bool",
            icon: {
                cache: "bool",
                color: "color",
                height: "int",
                name: "string",
                source: "url",
                width: "int",
            },
            shortcut: "keysequence",
            text: "string",
        },
        signals: {
            toggled: "void-(QtObject source)",
            triggered: "void-(QtObject source)",
        },
        methods: {
            toggle: "void-(QtObject source)",
            trigger: "void-(QtObject source)",
        },
        doc: {
            kind: "markdown",
            value: `Action represents an abstract user interface action that can have shortcuts and can be assigned to menu items and toolbar buttons.

  Actions may contain text, an icon, and a shortcut. Actions are normally triggered by the user via menu items, toolbar buttons, or keyboard shortcuts. A checkable Action toggles its checked state when triggered.

    Action {
        id: copyAction
        text: qsTr("&Copy")
        icon.name: "edit-copy"
        shortcut: StandardKey.Copy
        onTriggered: window.activeFocusItem.copy()
    }
      `,
        },
        inherit: "QtObject",
    },
    ActionGroup: {
        properties: {
            actions: "list<Action>",
            checkedAction: "Action",
            enabled: "bool",
            exclusive: "bool",
            group: "ActionGroup",
        },
        signals: {
            triggered: "void-(Action action)",
        },
        methods: {
            addAction: "void-(Action action)",
            removeAction: "void-(Action action)",
        },
        doc: {
            kind: "markdown",
            value: `ActionGroup is a non-visual group of actions. A mutually exclusive action group is used with actions where only one of the options can be selected at a time.

  The most straight-forward way to use ActionGroup is to declare actions as children of the group.

    ActionGroup {
        id: alignmentGroup

        Action {
            checked: true
            checkable: true
            text: qsTr("Left")
        }

        Action {
            checkable: true
            text: qsTr("Center")
        }

        Action {
            checkable: true
            text: qsTr("Right")
        }
    }
  `,
        },
        inherit: "QtObject",
    },
    ActionInput: {
        properties: {
            buttons: "list<int>",
            sourceDevice: "AbstractPhysicalDevice",
        },
        signals: {
            buttonsChanged: "void-(const QVector<int> &buttons)",
            sourceDeviceChanged: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `Links a physical device and selected buttons on it which can trigger this action.

  Each Action input can be triggered by one or many buttons on a source device

    ActionInput {
      sourceDevice: keyboardSourceDevice
      buttons: [Qt.Key_A]
    }
  `,
        },
        inherit: "QtObject",
    },
    AdditiveClipBlend: {
        properties: {
            additiveClip: "AbstractClipBlendNode",
            additiveFactor: "real",
            baseClip: "AbstractClipBlendNode",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    Address: {
        properties: {
            address: "QGeoAddress",
            city: "string",
            country: "string",
            countryCode: "string",
            county: "string",
            district: "string",
            isTextGenerated: "bool",
            postalCode: "string",
            state: "string",
            street: "string",
            text: "string",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `An Address is used as a unit of data for queries such as (Reverse) Geocoding or Places searches -- many of these operations either accept an Address or return one.

  Not all properties of an Address are necessarily available or relevant in all parts of the world and all locales. The district, state and county properties are particularly area-specific for many data sources, and often only one or two of these are available or useful.

  The Address has a text property which holds a formatted string. It is the recommended way to display an address to the user and typically takes the format of an address as found on an envelope, but this is not always the case. The text may be automatically generated from constituent address properties such as street, city and and so on, but can also be explicitly assigned. See text for details.`,
        },
        inherit: "QtObject",
    },
    Affector: {
        properties: {
            acceleration: "StochasticDirection",
            enabled: "bool",
            groups: "list<string>",
            once: "bool",
            position: "StochasticDirection",
            relative: "bool",
            shape: "Shape",
            system: "ParticleSystem",
            velocity: "StochasticDirection",
            whenCollidingWith: "list<string>",
        },
        signals: {
            affected: "void-(real x, real y)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `The base Affector does not alter any attributes, but can be used to emit a signal when a particle meets certain conditions.

  If an affector has a defined size, then it will only affect particles within its size and position on screen.

  Affectors have different performance characteristics to the other particle system elements. In particular, they have some simplifications to try to maintain a simulation at real-time or faster. When running a system with Affectors, irregular frame timings that grow too large ( > one second per frame) will cause the Affectors to try and cut corners with a faster but less accurate simulation. If the system has multiple affectors the order in which they are applied is not guaranteed, and when simulating larger time shifts they will simulate the whole shift each, which can lead to different results compared to smaller time shifts.

  Accurate simulation for large numbers of particles (hundreds) with multiple affectors may be possible on some hardware, but on less capable hardware you should expect small irregularties in the simulation as simulates with worse granularity.`,
        },
        inherit: "QtObject",
    },
    Age: {
        properties: {
            advancePosition: "bool",
            lifeLeft: "int",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The Age affector allows you to alter where the particle is in its lifecycle. Common uses are to expire particles prematurely, possibly giving them time to animate out.

  The Age affector is also sometimes known as a 'Kill' affector, because with the default parameters it will immediately expire all particles which it affects.

  The Age affector only applies to particles which are still alive.`,
        },
        inherit: "Affector",
    },
    AlphaCoverage: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `An AlphaCoverage type enables alpha-to-coverage multisampling mode. When enabled, the fragment alpha value is used as a coverage for the sample and combined with fragment coverage value. AlphaCoverage does nothing if multisampling is disabled. Alpha-to-coverage is most useful when order independent blending is required, for example when rendering leaves, grass and other rich vegetation.

  It can be added to a RenderPass:

    RenderPass {
      shaderProgram: ShaderProgram {
        // ...
      }
      renderStates: [
        AlphaCoverage {},
        MultiSampleAntiAliasing {}
      ]
    }
  `,
        },
        inherit: "RenderState",
    },
    AlphaTest: {
        properties: {
            alphaFunction: "enumeration",
            referenceValue: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `As the OpenGL documentation explains; The alpha test discards a fragment conditional on the outcome of a comparison between the incoming fragment's alpha value and a constant reference value.`,
        },
        inherit: "RenderState",
    },
    Altimeter: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The Altimeter element reports on altitude.

  This element wraps the QAltimeter class. Please see the documentation for QAltimeter for details.`,
        },
        inherit: "Sensor",
    },
    AltimeterReading: {
        properties: {
            altitude: "qreal",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AltimeterReading element holds the most recent Altimeter reading.

  This element wraps the QAltimeterReading class. Please see the documentation for QAltimeterReading for details.

  This element cannot be directly created.`,
        },
        inherit: "SensorReading",
    },
    AmbientLightReading: {
        properties: {
            lightLevel: "LightLevel",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AmbientLightReading element holds the most AmbientLightSensor reading.

  This element wraps the QAmbientLightReading class. Please see the documentation for QAmbientLightReading for details.

  This element cannot be directly created.
      `,
        },
        inherit: "SensorReading",
    },
    AmbientLightSensor: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AmbientLightSensor element repors on ambient lighting conditions.

  This element wraps the QAmbientLightSensor class. Please see the documentation for QAmbientLightSensor for details.

  See also AmbientLightReading`,
        },
        inherit: "Sensor",
    },
    AmbientTemperatureReading: {
        properties: {
            temperature: "qreal",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AmbientTemperatureReading element holds the most recent temperature reading.

  This element wraps the QAmbientTemperatureReading class. Please see the documentation for QAmbientTemperatureReading for details.

  This element cannot be directly created.`,
        },
        inherit: "SensorReading",
    },
    AmbientTemperatureSensor: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AmbientTemperatureSensor element reports on the ambient temperature.

  This element wraps the QAmbientTemperatureSensor class. Please see the documentation for QAmbientTemperatureSensor for details.`,
        },
        inherit: "Sensor",
    },
    AnalogAxisInput: {
        properties: {
            axis: "int",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    AnchorAnimation: {
        properties: {
            duration: "int",
            easing: {
                amplitude: "real",
                overshoot: "real",
                period: "real",
                type: "enumeration",
            },
            targets: "list<Item>",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AnchorAnimation is used to animate an anchor change.

  In the following snippet we animate the addition of a right anchor to a Rectangle:

    import QtQuick 2.0

    Item {
      id: container
      width: 200; height: 200

      Rectangle {
        id: myRect
        width: 100; height: 100
        color: "red"
      }

      states: State {
        name: "reanchored"
        AnchorChanges { target: myRect; anchors.right: container.right }
      }

      transitions: Transition {
        // smoothly reanchor myRect and move into new position
        AnchorAnimation { duration: 1000 }
      }

      Component.onCompleted: container.state = "reanchored"
    }
  `,
        },
        inherit: "Animation",
    },
    AnchorChanges: {
        properties: {
            anchors: {
                baseline: "AnchorLine",
                bottom: "AnchorLine",
                horizontalCenter: "AnchorLine",
                left: "AnchorLine",
                right: "AnchorLine",
                top: "AnchorLine",
                verticalCenter: "AnchorLine",
            },
            target: "Item",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AnchorChanges type is used to modify the anchors of an item in a State.

      AnchorChanges cannot be used to modify the margins on an item. For this, use PropertyChanges instead.

      In the following example we change the top and bottom anchors of an item using AnchorChanges, and the top and bottom anchor margins using PropertyChanges:

    import QtQuick 2.0

    Rectangle {
      id: window
      width: 120; height: 120
      color: "black"

      Rectangle { id: myRect; width: 50; height: 50; color: "red" }

      states: State {
        name: "reanchored"

        AnchorChanges {
          target: myRect
          anchors.top: window.top
          anchors.bottom: window.bottom
        }
        PropertyChanges {
          target: myRect
          anchors.topMargin: 10
          anchors.bottomMargin: 10
        }
      }

      MouseArea { anchors.fill: parent; onClicked: window.state = "reanchored" }
    }
  `,
        },
        inherit: "QtObject",
    },
    AngleDirection: {
        properties: {
            angle: "real",
            angleVariation: "real",
            magnitude: "real",
            magnitudeVariation: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AngledDirection element allows both the specification of a direction by angle and magnitude, as well as varying the parameters by angle or magnitude.`,
        },
        inherit: "Direction",
    },
    AnimatedImage: {
        properties: {
            currentFrame: "int",
            frameCount: "int",
            paused: "bool",
            playing: "bool",
            source: "url",
            speed: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The AnimatedImage type extends the features of the Image type, providing a way to play animations stored as images containing a series of frames, such as those stored in GIF files.

  Information about the current frame and total length of the animation can be obtained using the currentFrame and frameCount properties. You can start, pause and stop the animation by changing the values of the playing and paused properties.

  The full list of supported formats can be determined with QMovie::supportedFormats().`,
        },
        inherit: "Image",
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
    Animation: {
        properties: {
            alwaysRunToEnd: "bool",
            loops: "int",
            paused: "bool",
            running: "bool",
        },
        signals: {
            finished: "void-()",
            started: "void-()",
            stopped: "void-()",
        },
        methods: {
            complete: "void-()",
            pause: "void-()",
            restart: "void-()",
            resume: "void-()",
            start: "void-()",
            stop: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The Animation type cannot be used directly in a QML file. It exists to provide a set of common properties and methods, available across all the other animation types that inherit from it. Attempting to use the Animation type directly will result in an error.`,
        },
        inherit: "QtObject",
    },
    AnimationController: {
        properties: {
            animation: "Animation",
            progress: "real",
        },
        signals: {},
        methods: {
            completeToBeginning: "void-()",
            completeToEnd: "void-()",
            reload: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `Normally animations are driven by an internal timer, but the AnimationController allows the given animation to be driven by a progress value explicitly.      `,
        },
        inherit: "QtObject",
    },
    AnimationGroup: {
        properties: {
            animations: "list<AbstractAnimation>",
            duration: "real",
            name: "string",
            position: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AnimationGroup type is used to group multiple animations so that they can act as one animation. The position set to the group is also set to all animations in a group. The duration is the maximum of the individual animations. The animations can be any supported animation type and do not have to have the same name.`,
        },
        inherit: "QtObject",
    },
    Animator: {
        properties: {
            duration: "int",
            easing: {
                amplitude: "real",
                bezierCurve: "list<real>",
                overshoot: "real",
                period: "real",
                type: "enumeration",
            },
            from: "real",
            target: "QtQuick::Item",
            to: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Animator types are a special type of animation which operate directly on Qt Quick's scene graph, rather than the QML objects and their properties like regular Animation types do. This has the benefit that Animator based animations can animate on the scene graph's rendering thread even when the UI thread is blocked.

  The value of the QML property will be updated after the animation has finished. The property is not updated while the animation is running.

  The Animator types can be used just like any other Animation type.

    Rectangle {
      id: mixBox
      width: 50
      height: 50
      ParallelAnimation {
        ColorAnimation {
          target: mixBox
          property: "color"
          from: "forestgreen"
          to: "lightsteelblue";
          duration: 1000
        }
        ScaleAnimator {
          target: mixBox
          from: 2
          to: 1
          duration: 1000
        }
        running: true
      }
    }
  `,
        },
        inherit: "Animation",
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
            window: "ApplicationWindow",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `ApplicationWindow is a Window which makes it convenient to add a menu bar, header and footer item to the window.

  You can declare ApplicationWindow as the root item of your application, and run it by using QQmlApplicationEngine. In this way you can control the window's properties, appearance and layout from QML.

    import QtQuick.Controls 2.12

    ApplicationWindow {
      visible: true

      menuBar: MenuBar {
        // ...
      }

      header: ToolBar {
        // ...
      }

      footer: TabBar {
        // ...
      }

      StackView {
        anchors.fill: parent
      }
    }
  `
        },
        inherit: "Window",
    },
    ApplicationWindowStyle: {
        properties: {
            background: "Component",
            control: "ApplicationWindow",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `You can create a custom window background by replacing the "background" delegate of ApplicationWindowStyle with a custom design.

  Example:

    ApplicationWindow {
      style: ApplicationWindowStyle {
        background: BorderImage {
          source: "background.png"
          border { left: 20; top: 20; right: 20; bottom: 20 }
        }
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    AreaSeries: {
        properties: {
            axisAngular: "AbstractAxis",
            axisRadial: "AbstractAxis",
            axisX: "AbstractAxis",
            axisXTop: "AbstractAxis",
            axisY: "AbstractAxis",
            axisYRight: "AbstractAxis",
            borderColor: "color",
            borderWidth: "real",
            brush: "brush",
            brushFilename: "QString",
            color: "color",
            lowerSeries: "LineSeries",
            pointLabelsClipping: "bool",
            pointLabelsColor: "font",
            pointLabelsFont: "font",
            pointLabelsFormat: "string",
            pointLabelsVisible: "bool",
            upperSeries: "LineSeries",
        },
        signals: {
            clicked: "void-(point point)",
            doubleClicked: "void-(point point)",
            hovered: "void-(point point, bool state)",
            pressed: "void-(point point)",
            released: "void-(point point)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `An area series is used to show quantitative data. It is based on a line series, in the way that the area between the boundary lines is emphasized with color. The LineSeries type defines the upper boundary of the area. The area chart is drawn using the bottom of the plot area as the lower boundary by default. Instead of the bottom of the plot area, the lower boundary can be specified by another line. In that case, the AreaSeries should use two LineSeries types.`,
        },
        inherit: "AbstractSeries",
    },
    Armature: {
        properties: {
            skeleton: "AbstractSkeleton",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The Armature component is aggregated by entities to give them the ability to calculate the palette of skinning transform matrices needed to properly render skinned meshes.

    Each vertex in a skinned mesh is associated (bound) to up to 4 joints in a skeleton. For each joint affecting a vertex the mesh also provides a weight which determines the level of influence of the corresponding joint. The skinning palette used for performing the transformation of skinned vertices is provided by the Armature and is calculated from the joints contained in the referenced skeleton.

    Updating the local transform of a joint results in the skinning matrices being recalculated and the skinned mesh vertices bound to that joint moving accordingly.`,
        },
        inherit: "Component3D",
    },
    AttenuationModelInverse: {
        properties: {
            end: "real",
            name: "string",
            rolloff: "real",
            start: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AttenuationModelInverse must be defined inside AudioEngine or be added to it using AudioEngine.addAttenuationModel() if AttenuationModelInverse is created dynamically.

    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine

        AttenuationModelInverse {
          name:"linear"
          start: 20
          end: 500
          rolloff: 1.5
        }

        AudioSample {
          name:"explosion"
          source: "explosion-02.wav"
        }

        Sound {
          name:"explosion"
          attenuationModel: "linear"
          PlayVariation {
            sample:"explosion"
          }
        }
      }
    }
  `,
        },
        inherit: "Item",
    },
    AttenuationModelLinear: {
        properties: {
            end: "real",
            name: "string",
            start: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AttenuationModelLinear must be defined inside AudioEngine or be added to it using AudioEngine.addAttenuationModel() if AttenuationModelLinear is created dynamically.

    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine

        AttenuationModelLinear {
          name:"linear"
          start: 20
          end: 180
        }

        AudioSample {
          name:"explosion"
          source: "explosion-02.wav"
        }

        Sound {
          name:"explosion"
          attenuationModel: "linear"
          PlayVariation {
            sample:"explosion"
          }
        }
      }
    }
  `,
        },
        inherit: "Item",
    },
    Attractor: {
        properties: {
            affectedParameter: "AffectableParameter",
            proportionalToDistance: "Proportion",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Note that the size and position of this element affects which particles it affects. The size of the point attracted to is always 0x0, and the location of that point is specified by the pointX and pointY properties.

  Note that Attractor has the standard Item x,y,width and height properties. Like other affectors, these represent the affected area. They do not represent the 0x0 point which is the target of the attraction.`,
        },
        inherit: "Affector",
    },
    Audio: {
        properties: {
            audioRole: "enumeration",
            autoLoad: "bool",
            autoPlay: "bool",
            availability: "enumeration",
            bufferProgress: "real",
            customAudioRole: "string",
            duration: "int",
            error: "enumeration",
            errorString: "string",
            hasAudio: "bool",
            hasVideo: "bool",
            loops: "int",
            mediaObject: "variant",
            metaData: {
                albumArtist: "variant",
                albumTitle: "variant",
                audioBitRate: "variant",
                audioCodec: "variant",
                author: "variant",
                averageLevel: "variant",
                category: "variant",
                channelCount: "variant",
                chapterNumber: "variant",
                comment: "variant",
                composer: "variant",
                conductor: "variant",
                contributingArtist: "variant",
                copyright: "variant",
                coverArtUrlLarge: "variant",
                coverArtUrlSmall: "variant",
                date: "variant",
                description: "variant",
                director: "variant",
                genre: "variant",
                keywords: "variant",
                language: "variant",
                leadPerformer: "variant",
                lyrics: "variant",
                mediaType: "variant",
                mood: "variant",
                parentalRating: "variant",
                peakValue: "variant",
                pixelAspectRatio: "variant",
                posterUrl: "variant",
                publisher: "variant",
                ratingOrganization: "variant",
                resolution: "variant",
                sampleRate: "variant",
                size: "variant",
                subTitle: "variant",
                title: "variant",
                trackCount: "variant",
                trackNumber: "variant",
                userRating: "variant",
                videoBitRate: "variant",
                videoCodec: "variant",
                videoFrameRate: "variant",
                writer: "variant",
                year: "variant",
            },
            muted: "bool",
            notifyInterval: "int",
            playbackRate: "real",
            playbackState: "enumeration",
            playlist: "Playlist",
            position: "int",
            seekable: "bool",
            source: "url",
            status: "enumeration",
            volume: "real",
        },
        signals: {
            error: "void-(error, errorString)",
            paused: "void-()",
            playbackStateChanged: "void-()",
            playing: "void-()",
            stopped: "void-()",
        },
        methods: {
            pause: "void-()",
            play: "void-()",
            seek: "void-(offset)",
            stop: "void-()",
            supportedAudioRoles: "list<int>-()",
        },
        doc: {
            kind: "markdown",
            value: `
    Text {
      text: "Click Me!";
      font.pointSize: 24;
      width: 150; height: 50;

      Audio {
        id: playMusic
        source: "music.wav"
      }
      MouseArea {
        id: playArea
        anchors.fill: parent
        onPressed:  { playMusic.play() }
      }
  }
  `,
        },
        inherit: "QtObject",
    },
    AudioCategory: {
        properties: {
            name: "string",
            volume: "real",
        },
        signals: {},
        methods: {
            pause: "void-()",
            stop: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `An instance of AudioCategory can be accessed through AudioEngine.categories with its unique name and must be defined inside AudioEngine or be added to it using AudioEngine.addAudioCategory() if AudioCategory is created dynamically.

    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine

        AudioCategory {
          name: "sfx"
          volume: 0.8
        }

        AudioSample {
          name:"explosion"
          source: "explosion-02.wav"
        }

        Sound {
          name:"explosion"
          category: "sfx"
          PlayVariation {
            sample:"explosion"
          }
        }
      }

      MouseArea {
        anchors.fill: parent
        onPressed: {
          audioengine.categories["sfx"].volume = 0.5;
        }
      }
    }
  `,
        },
        inherit: "Item",
    },
    AudioEngine: {
        properties: {
            categories: "map",
            dopplerFactor: "real",
            listener: "QtAudioEngine::AudioListener",
            liveInstances: "int",
            loading: "bool",
            samples: "map",
            sounds: "map",
            speedOfSound: "real",
        },
        signals: {
            finishedLoading: "void-()",
            isLoadingChanged: "void-()",
            liveInstanceCountChanged: "void-()",
            ready: "void-()",
        },
        methods: {
            addAttenuationModel: "void-(AttenuationModel attenuationModel)",
            addAudioCategory: "void-(AudioCategory category)",
            addAudioSample: "void-(AudioSample sample)",
            addSound: "void-(Sound sound)",
        },
        doc: {
            kind: "markdown",
            value: `
    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine

        AudioSample {
          name:"explosion"
          source: "explosion-02.wav"
        }

        Sound {
          name:"explosion"
          PlayVariation {
            sample:"explosion"
          }
      }

      dopplerFactor: 1
      speedOfSound: 343.33 // Approximate speed of sound in air at 20 degrees Celsius

      listener.up:"0,0,1"
      listener.position:"0,0,0"
      listener.velocity:"0,0,0"
      listener.direction:"0,1,0"
    }

    MouseArea {
      anchors.fill: parent
      onPressed: {
        audioengine.sounds["explosion"].play();
      }
    }
  }
  `,
        },
        inherit: "Item",
    },
    AudioListener: {
        properties: {
            direction: "vector3d",
            engine: "QtAudioEngine::AudioEngine",
            gain: "real",
            position: "vector3d",
            up: "vector3d",
            velocity: "vector3d",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `AudioListener will have only one global instance and you can either access it through the listener property of AudioEngine:

    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine
        listener.up:"0,0,1"
        listener.velocity:"0,0,0"
        listener.direction:"0,1,0"
        listener.position:Qt.vector3d(observer.x, observer.y, 0);
      }

      Item {
        id: observer
        x: 10 + observer.percent * 100
        y: 20 + observer.percent * 80
        property real percent: 0
        SequentialAnimation on percent {
          loops: Animation.Infinite
          running: true
          NumberAnimation {
            duration: 8000
            from: 0
            to: 1
          }
        }
      }
    }
  `,
        },
        inherit: "Item",
    },
    AudioSample: {
        properties: {
            loaded: "bool",
            name: "string",
            preloaded: "bool",
            source: "url",
        },
        signals: {
            loadedChanged: "void-()",
        },
        methods: {
            load: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `It can be accessed through QtAudioEngine::AudioEngine::samples with its unique name and must be defined inside AudioEngine or be added to it using AudioEngine.addAudioSample() if AudioSample is created dynamically.

    Rectangle {
      color:"white"
      width: 300
      height: 500

      AudioEngine {
        id:audioengine

        AudioSample {
          name:"explosion"
          source: "explosion-02.wav"
        }
      }
    }
  `,
        },
        inherit: "Item",
    },
    AuthenticationDialogRequest: {
        properties: {
            accepted: "bool",
            proxyHost: "string",
            realm: "string",
            type: "enumeration",
            url: "url",
        },
        signals: {},
        methods: {
            dialogAccept: "void-(string username, string password)",
            dialogReject: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `An AuthenticationDialogRequest is passed as an argument of the WebEngineView::authenticationDialogRequested signal. It is generated when basic HTTP or proxy authentication is required. The type of authentication can be checked with the type property.

  The accepted property of the request indicates whether the request is handled by the user code or the default dialog should be displayed. If you set the accepted property to true, make sure to call either dialogAccept() or dialogReject() afterwards.

  The following code uses a custom dialog to handle the request:

    WebEngineView {
      // ...
      onAuthenticationDialogRequested: function(request) {
        request.accepted = true;
        myDialog.request = request // keep the reference to the request
        myDialog.accept.connect(request.dialogAccept);
        myDialog.reject.connect(request.dialogReject);
        myDialog.visible = true;
      }
      // ...
    }
  `,
        },
        inherit: "QtObject",
    },
    Axis: {
        properties: {
            buttons: "QVariantList",
            inputs: "list<AbstractAxisInput>",
            scale: "real",
            value: "int",
            velocity: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Links a set of AbstractAxisInputs that trigger the same event.`,
        },
        inherit: "QtObject",
    },
    AxisAccumulator: {
        properties: {
            sourceAxis: "Axis",
            sourceAxisType: "SourceAxisType",
            value: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `An Axis reports the current position of an axis on an input device. When the axis is returned to its neutral position the value of that axis returns to 0. Often, it is required to have the input from an axis control a variable in other ways, for example treating the value from the Axis as a velocity (first derivative with respect to time) or as an acceleration (second derivative with respect to time). This can be done with user code or with a FrameAction but those approached are not ideal as they add more work to the main thread and are inherently imperative. The AxisAccumulator class allows for this common task to be performed on the Qt 3D backend and be specified in a declarative manner.`,
        },
        inherit: "QtObject",
    },
    AxisSetting: {
        properties: {
            axes: "list<int>",
            axis: "QVariantList",
            deadZoneRadius: "float",
            smooth: "bool",
        },
        signals: {
            axisChanged: "void-()",
            deadZoneRadiusChanged: "void-()",
            smoothChanged: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `Stores settings for the specified list of Axis`,
        },
        inherit: "QtObject",
    },
    BackspaceKey: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Sends a backspace key for input method processing. This key is repeatable.`,
        },
        inherit: "BaseKey",
    },
    Bar3DSeries: {
        properties: {
            dataProxy: "BarDataProxy",
            invalidSelectionPosition: "point",
            meshAngle: "real",
            selectedBar: "point",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type manages the series specific visual elements, as well as the series data (via a data proxy).

  For a more complete description, see QBar3DSeries.`,
        },
        inherit: "Abstract3DSeries",
    },
    BarCategoryAxis: {
        properties: {
            categories: "QStringList",
            count: "int",
            max: "string",
            min: "string",
        },
        signals: {
            rangeChanged: "void-(string min, string max)",
        },
        methods: {
            clear: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `The BarCategoryAxis type can be set up to show an axis line with tick marks, grid lines, and shades. Categories are drawn between the ticks. It can be used also with a line series.

    The following QML snippet illustrates how to use BarCategoryAxis:

    ChartView {
      BarCategoryAxis {
        id: categoryAxis
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun" ]
      }
      // Add a few series...
    }
  `,
        },
        inherit: "AbstractAxis",
    },
    BarDataProxy: {
        properties: {
            columnLabels: "list",
            rowCount: "int",
            rowLabels: "list",
            series: "Bar3DSeries",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type handles adding, inserting, changing, and removing rows of data with Qt Quick 2.

  This type is uncreatable, but contains properties that are exposed via subtypes.

  For a more complete description, see QBarDataProxy.`,
        },
        inherit: "AbstractDataProxy",
    },
    Bars3D: {
        properties: {
            barSpacing: "size",
            barSpacingRelative: "bool",
            barThickness: "real",
            columnAxis: "CategoryAxis3D",
            floorLevel: "real",
            multiSeriesUniform: "bool",
            primarySeries: "Bar3DSeries",
            rowAxis: "CategoryAxis3D",
            selectedSeries: "Bar3DSeries",
            seriesList: "list<Bar3DSeries>",
            valueAxis: "ValueAxis3D",
        },
        signals: {},
        methods: {
            addSeries: "void-(Bar3DSeries series)",
            insertSeries: "void-(int index, Bar3DSeries series)",
            removeSeries: "void-(Bar3DSeries series)",
        },
        doc: {
            kind: "markdown",
            value: `This type enables developers to render bar graphs in 3D with Qt Quick 2.

  You will need to import data visualization module to use this type

  After that you can use Bars3D in your qml files:

    import QtQuick 2.0
    import QtDataVisualization 1.2

    Item {
      width: 640
      height: 480

      Bars3D {
        width: parent.width
        height: parent.height

        Bar3DSeries {
          itemLabelFormat: "@colLabel, @rowLabel: @valueLabel"

          ItemModelBarDataProxy {
            itemModel: dataModel
            // Mapping model roles to bar series rows, columns, and values.
            rowRole: "year"
            columnRole: "city"
            valueRole: "expenses"
          }
        }
      }

      ListModel {
        id: dataModel
        ListElement{ year: "2012"; city: "Oulu";     expenses: "4200"; }
        ListElement{ year: "2012"; city: "Rauma";    expenses: "2100"; }
        ListElement{ year: "2012"; city: "Helsinki"; expenses: "7040"; }
        ListElement{ year: "2012"; city: "Tampere";  expenses: "4330"; }
        ListElement{ year: "2013"; city: "Oulu";     expenses: "3960"; }
        ListElement{ year: "2013"; city: "Rauma";    expenses: "1990"; }
        ListElement{ year: "2013"; city: "Helsinki"; expenses: "7230"; }
        ListElement{ year: "2013"; city: "Tampere";  expenses: "4650"; }
      }
    }
  `,
        },
        inherit: "AbstractGraph3D",
    },
    BarSeries: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The data is drawn as a series of vertical bars grouped by category, with one bar per category from each bar set added to the series.

  The following QML code snippet shows how to create a simple grouped bar chart:

    ChartView {
      title: "Bar series"
      anchors.fill: parent
      legend.alignment: Qt.AlignBottom
      antialiasing: true

      BarSeries {
        id: mySeries
        axisX: BarCategoryAxis { categories: ["2007", "2008", "2009", "2010", "2011", "2012" ] }
        BarSet { label: "Bob"; values: [2, 2, 3, 4, 5, 6] }
        BarSet { label: "Susan"; values: [5, 1, 2, 4, 1, 7] }
        BarSet { label: "James"; values: [3, 5, 8, 13, 5, 8] }
      }
    }
  `,
        },
        inherit: "AbstractBarSeries",
    },
    BarSet: {
        properties: {
            orderColor: "color",
            borderWidth: "real",
            brushFilename: "string",
            color: "color",
            count: "int",
            label: "string",
            labelColor: "color",
            labelFont: "font",
            values: "QVariantList",
        },
        signals: {
            valueChanged: "void-(int index)",
            valuesAdded: "void-(int index, int count)",
            valuesRemoved: "void-(int index, int count)",
        },
        methods: {
            append: "void-(real value)",
            at: "void-(int index)",
            clicked: "void-(int index)",
            doubleClicked: "void-(int index)",
            pressed: "void-(int index)",
            released: "void-(int index)",
            remove: "void-(int index, int count)",
            replace: "void-(int index, real value)",
        },
        doc: {
            kind: "markdown",
            value: `A bar set contains one data value for each category. The first value of a set is assumed to belong to the first category, the second one to the second category, and so on. If the set has fewer values than there are categories, the missing values are assumed to be located at the end of the set. For missing values in the middle of a set, the numerical value of zero is used. Labels for zero value sets are not shown.`,
        },
        inherit: "QtObject",
    },
    BaseKey: {
        properties: {
            active: "bool",
            alternativeKeys: "var",
            displayText: "string",
            effectiveAlternativeKeys: "var",
            effectiveAlternativeKeysHighlightIndex: "int",
            functionKey: "bool",
            highlighted: "bool",
            key: "int",
            keyPanelDelegate: "alias",
            noKeyEvent: "bool",
            noModifier: "bool",
            pressed: "bool",
            repeat: "bool",
            showPreview: "bool",
            smallText: "string",
            smallTextVisible: "bool",
            soundEffect: "url",
            text: "string",
            uppercased: "bool",
            weight: "real",
        },
        signals: {
            clicked: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `aseKey is a common type for all keys in keyboard layout.

  This type should not be used directly in the layouts. The specialized key types, such as Key or EnterKey should be used instead.`,
        },
        inherit: "Item",
    },
    Behavior: {
        properties: {
            animation: "Animation",
            enabled: "bool",
            targetProperty: {
                name: "string",
                object: "Object",
            },
            targetValue: "Variant"
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `A Behavior defines the default animation to be applied whenever a particular property value changes.

  For example, the following Behavior defines a NumberAnimation to be run whenever the Rectangle's width value changes. When the MouseArea is clicked, the width is changed, triggering the behavior's animation:

    import QtQuick 2.0

    Rectangle {
      id: rect
      width: 100; height: 100
      color: "red"

      Behavior on width {
        NumberAnimation { duration: 1000 }
      }

      MouseArea {
        anchors.fill: parent
        onClicked: rect.width = 50
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    Binding: {
        properties: {
            delayed: "bool",
            property: "string",
            restoreMode: "enumeration",
            target: "Object",
            value: "any",
            when: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `n QML, property bindings result in a dependency between the properties of different objects.

    Binding on value {
      when: mouse.pressed
      value: mouse.mouseX
    }
  `,
        },
        inherit: "QtObject",
    },
    Blend: {
        properties: {
            cached: "bool",
            foregroundSource: "variant",
            mode: "string",
            source: "variant",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Blend mode can be selected with the mode property.

    import QtQuick 2.12
    import QtGraphicalEffects 1.12

    Item {
      width: 300
      height: 300

      Image {
        id: bug
        source: "images/bug.jpg"
        sourceSize: Qt.size(parent.width, parent.height)
        smooth: true
        visible: false
      }

      Image {
        id: butterfly
        source: "images/butterfly.png"
        sourceSize: Qt.size(parent.width, parent.height)
        smooth: true
        visible: false
      }

      Blend {
        anchors.fill: bug
        source: bug
        foregroundSource: butterfly
        mode: "subtract"
      }
    }
  `,
        },
        inherit: "Item",
    },
    BlendedClipAnimator: {
        properties: {
            blendTree: "AbstractClipBlendNode",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `An instance of BlendedClipAnimator can be aggregated by an Entity to add the ability to play back animation clips and to apply the calculated animation values to properties of QObjects.

  Whereas a ClipAnimator gets its animation data from a single animation clip, BlendedClipAnimator can blend together multiple clips. The animation data is obtained by evaluating a so called blend tree. A blend tree is a hierarchical tree structure where the leaf nodes are value nodes that encapsulate an animation clip (AbstractAnimationClip); and the internal nodes represent blending operations that operate on the nodes pointed to by their operand properties.

  To associate a blend tree with a BlendedClipAnimator, set the animator's blendTree property to point at the root node of your blend tree:

    BlendedClipAnimator {
      blendTree: AdditiveClipBlend {
        //....
      }
    }
  `,
        },
        inherit: "AbstractClipAnimator",
    },
    BlendEquation: {
        properties: {
            blendFunction: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The blend equation is used to determine how a new pixel is combined with a pixel already in the framebuffer.`,
        },
        inherit: "RenderState",
    },
    BlendEquationArguments: {
        properties: {
            DestinationAlpha: "enumeration",
            bufferIndex: "int",
            destinationRgb: "enumeration",
            sourceAlpha: "enumeration",
            sourceRgb: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `OpenGL pre-3.0: Set the same blend state for all draw buffers OpenGL 3.0-pre4.0: Set the same blend state for all draw buffers, but can disable blending for particular buffers OpenGL 4.0+: Can set blend state individually for each draw buffer.`,
        },
        inherit: "RenderState",
    },
    BlitFramebuffer: {
        properties: {
            destination: "RenderTarget",
            destinationAttachmentPoint: "RenderTargetOutput.AttachmentPoint",
            destinationRect: "Rect",
            interpolationMethod: "InterpolationMethod",
            source: "RenderTarget",
            sourceAttachmentPoint: "RenderTargetOutput.AttachmentPoint",
            sourceRect: "Rect",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This node inserts a glBlitFrameBuffer or an equivalent into the command stream. This provides a more efficient method for copying rectangles between textures or surface backbuffers wrapped by QRenderTarget than drawing textured quads. It also supports scaling with the specified interpolation method.`,
        },
        inherit: "FrameGraphNode",
    },
    BluetoothDiscoveryModel: {
        properties: {
            discoveryMode: "enumeration",
            error: "enumeration",
            remoteAddress: "string",
            running: "bool",
            uuidFilter: "string",
        },
        signals: {
            deviceDiscovered: "void-(string device)",
            serviceDiscovered: "void-(BluetoothService service)",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `BluetoothDiscoveryModel provides a model of connectable services. The contents of the model can be filtered by UUID allowing discovery to be limited to a single service such as a game.

  The model roles provided by BluetoothDiscoveryModel are service, name, remoteAddress and deviceName. The meaning of the roles changes based on the current discoveryMode.`,
        },
        inherit: "QtObject",
    },
    BluetoothService: {
        properties: {
            deviceAddress: "string",
            deviceName: "string",
            registered: "string",
            serviceDescription: "string",
            serviceName: "string",
            serviceProtocol: "enumeration",
            serviceUuid: "string",
        },
        signals: {
            detailsChanged: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `It allows a QML project to get information about a remote service, or describe a service for a BluetoothSocket to connect to.`,
        },
        inherit: "QtObject",
    },
    BluetoothSocket: {
        properties: {
            connected: "bool",
            error: "enumeration",
            service: "BluetoothService",
            state: "enumeration",
            stringData: "string",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `It allows a QML class connect to another Bluetooth device and exchange strings with it. Data is sent and received using a QDataStream object allowing type safe transfers of QStrings. QDataStream is a well known format and can be decoded by non-Qt applications. Note that for the ease of use, BluetoothSocket is only well suited for use with strings. If you want to use a binary protocol for your application's communication you should consider using its C++ counterpart QBluetoothSocket.

  Connections to remote devices can be over RFCOMM or L2CAP. Either the remote port or service UUID is required. This is specified by creating a BluetoothService, or passing in the service return from BluetoothDiscoveryModel.`,
        },
        inherit: "QtObject",
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

  A BorderImage breaks a source image, specified using the source property, into 9 regions

    BorderImage {
      width: 180; height: 180
      border { left: 30; top: 30; right: 30; bottom: 30 }
      horizontalTileMode: BorderImage.Stretch
      verticalTileMode: BorderImage.Stretch
      source: "pics/borderframe.png"
    }
  `,
        },
        inherit: "Item",
    },
    BorderImageMesh: {
        properties: {
            border: {
                bottom: "int",
                left: "int",
                right: "int",
                top: "int",
            },
            horizontalTileMode: "enumeration",
            size: "size",
            verticalTileMode: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `BorderImageMesh provides BorderImage-like capabilities to a ShaderEffect without the need for a potentially costly ShaderEffectSource.

  The following are functionally equivalent:

    BorderImage {
      id: borderImage
      border {
        left: 10
        right: 10
        top: 10
        bottom: 10
      }
      source: "myImage.png"
      visible: false
    }
    ShaderEffectSource {
      id: effectSource
      sourceItem: borderImage
      visible: false
    }
    ShaderEffect {
      property var source: effectSource
      //...
    }
  `,
        },
        inherit: "QtObject",
    },
    BoxPlotSeries: {
        properties: {
            axisX: "AbstractAxis",
            axisXTop: "AbstractAxis",
            axisY: "AbstractAxis",
            axisYRight: "AbstractAxis",
            boxOutlineVisible: "bool",
            boxWidth: "real",
            brushFilename: "string",
            count: "int",
        },
        signals: {
            boxsetsAdded: "void-(list sets)",
            boxsetsRemoved: "void-(list sets)",
            clicked: "void-(BoxSet boxset)",
            doubleClicked: "void-(BoxSet boxset)",
            hovered: "void-(bool status, BoxSet boxset)",
            pressed: "void-(BoxSet boxset)",
            released: "void-(BoxSet boxset)",
        },
        methods: {
            append: [
                "void-(BoxSet box)",
                "void-(string label, VariantList values)",
            ],
            at: "void-(int index)",
            clear: "void-()",
            insert: "void-(int index, string label, VariantList values)",
            remove: "void-(QBoxSet boxset)",
        },
        doc: {
            kind: "markdown",
            value: `A box plot series acts as a container for box-and-whiskers items. Items from multiple series are grouped into categories according to their index value.

  The BarCategoryAxis class is used to add the categories to the chart's axis. Category labels have to be unique. If the same category label is defined for several box-and-whiskers items, only the first one is drawn.

  The following QML code snippet shows how to create a simple box-and-whiskers chart:

    import QtQuick 2.0
    import QtCharts 2.0

    ChartView {
      title: "Box Plot series"
      width: 400
      height: 300
      theme: ChartView.ChartThemeBrownSand
      legend.alignment: Qt.AlignBottom

      BoxPlotSeries {
        id: plotSeries
        name: "Income"
        BoxSet { label: "Jan"; values: [3, 4, 5.1, 6.2, 8.5] }
        BoxSet { label: "Feb"; values: [5, 6, 7.5, 8.6, 11.8] }
        BoxSet { label: "Mar"; values: [3.2, 5, 5.7, 8, 9.2] }
        BoxSet { label: "Apr"; values: [3.8, 5, 6.4, 7, 8] }
        BoxSet { label: "May"; values: [4, 5, 5.2, 6, 7] }
      }
    }
  `,
        },
        inherit: "AbstractSeries",
    },
    BoxSet: {
        properties: {
            brushFilename: "string",
            count: "int",
            label: "string",
            values: "list",
        },
        signals: {
            cleared: "void-()",
            clicked: "void-()",
            doubleClicked: "void-()",
            hovered: "void-(bool status)",
            pressed: "void-()",
            released: "void-()",
            valueChanged: "void-(int index)",
            valuesChanged: "void-()",
        },
        methods: {
            append: "void-(qreal value)",
            at: "void-(int index)",
            clear: "void-()",
            setValue: "void-(int index, qreal value)",
        },
        doc: {
            kind: "markdown",
            value: `A box-and-whiskers item is a graphical representation of a range and three median values that is constructed from five different values. There are two ways to specify the values. The first one is by using a constructor or the append() method. The values have to be specified in the following order: lower extreme, lower quartile, median, upper quartile, and upper extreme.

  The second way is to create an empty BoxSet instance and specify the values using the setValue() method.`,
        },
        inherit: "QtObject",
    },
    BrightnessContrast: {
        properties: {
            brightness: "real",
            cached: "bool",
            contrast: "real",
            source: "variant",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This effect adjusts the source item colors. Brightness adjustment changes the perceived luminance of the source item. Contrast adjustment increases or decreases the color and brightness variations.

      import QtQuick 2.12
      import QtGraphicalEffects 1.12

      Item {
        width: 300
        height: 300

        Image {
          id: bug
          source: "images/bug.jpg"
          sourceSize: Qt.size(parent.width, parent.height)
          smooth: true
          visible: false
        }

        BrightnessContrast {
          anchors.fill: bug
          source: bug
          brightness: 0.5
          contrast: 0.5
        }
      }
  `,
        },
        inherit: "Item",
    },
    Buffer: {
        properties: {
            bufferFlags: "enumeration",
            format: "enumeration",
            name: "string",
            sizeMultiplier: "real",
            textureCoordOperation: "enumeration",
            textureFilterOperation: "enumeration",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    BusyIndicator: {
        properties: {
            running: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `The busy indicator should be used to indicate activity while content is being loaded or the UI is blocked waiting for a resource to become available.

  The following snippet shows how to use the BusyIndicator:

    BusyIndicator {
      running: image.status === Image.Loading
    }
  `,
        },
        inherit: "Control",
    },
    BusyIndicatorStyle: {
        properties: {
            control: "BusyIndicator",
            indicator: "Component",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `You can create a busy indicator by replacing the "indicator" delegate of the BusyIndicatorStyle with a custom design.

  Example:

    BusyIndicator {
      style: BusyIndicatorStyle {
        indicator: Image {
          visible: control.running
          source: "spinner.png"
          RotationAnimator on rotation {
            running: control.running
            loops: Animation.Infinite
            duration: 2000
            from: 0 ; to: 360
          }
        }
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    Button: {
        properties: {
            flat: "bool",
            highlighted: "bool",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Button presents a push-button control that can be pushed or clicked by the user. Buttons are normally used to perform an action, or to answer a question. Typical buttons are OK, Apply, Cancel, Close, Yes, No, and Help.

  Button inherits its API from AbstractButton. For instance, you can set text, display an icon, and react to clicks using the AbstractButton API.

  A button emits the signal clicked() when it is activated by the user. Connect to this signal to perform the button's action. Buttons also provide the signals canceled(), doubleClicked(), pressed(), released() and pressAndHold() for long presses.

  See the snippet below on how to connect to the button's signals.

    RowLayout {
      Button {
        text: "Ok"
        onClicked: model.submit()
      }
      Button {
        text: "Cancel"
        onClicked: model.revert()
      }
    }
  `,
        },
        inherit: "AbstractButton",
    },
    ButtonAxisInput: {
        properties: {
            acceleration: "real",
            buttons: "list<var>",
            deceleration: "list<var>",
            scale: "real",
        },
        signals: {},
        methods: {},
        inherit: "QtObject",
    },
    ButtonGroup: {
        properties: {
            buttons: "list<AbstractButton>",
            checkState: "enumeration",
            checkedButton: "AbstractButton",
            exclusive: "bool",
            group: "ButtonGroup",
        },
        signals: {
            clicked: "void-(AbstractButton button)",
        },
        methods: {
            addButton: "void-(AbstractButton button)",
            removeButton: "void-(AbstractButton button)",
        },
        doc: {
            kind: "markdown",
            value: `ButtonGroup is a non-visual, mutually exclusive group of buttons. It is used with controls such as RadioButton, where only one of the options can be selected at a time.

  The most straight-forward way to use ButtonGroup is to assign a list of buttons. For example, the list of children of a positioner or a layout that manages a group of mutually exclusive buttons.

    ButtonGroup {
      buttons: column.children
    }

    Column {
      id: column

      RadioButton {
        checked: true
        text: qsTr("DAB")
      }

      RadioButton {
        text: qsTr("FM")
      }

      RadioButton {
        text: qsTr("AM")
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    ButtonStyle: {
        properties: {
            background: "Component",
            control: "Button",
            label: "Component",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `You can create a custom button by replacing the "background" delegate of the ButtonStyle with a custom design.

  Example:

    Button {
      text: "A button"
      style: ButtonStyle {
        background: Rectangle {
          implicitWidth: 100
          implicitHeight: 25
          border.width: control.activeFocus ? 2 : 1
          border.color: "#888"
          radius: 4
          gradient: Gradient {
            GradientStop { position: 0 ; color: control.pressed ? "#ccc" : "#eee" }
            GradientStop { position: 1 ; color: control.pressed ? "#aaa" : "#ccc" }
          }
        }
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    Calendar: {
        properties: {
            dayOfWeekFormat: "int",
            frameVisible: "bool",
            locale: "var",
            maximumDate: "date",
            minimumDate: "date",
            navigationBarVisible: "bool",
            selectedDate: "date",
            visibleMonth: "int",
            visibleYear: "int",
            weekNumbersVisible: "bool",
        },
        signals: {
            clicked: "void-(date date)",
            doubleClicked: "void-(date date)",
            hovered: "void-(date date)",
            pressAndHold: "void-(date date)",
            pressed: "void-(date date)",
            released: "void-(date date)",
        },
        methods: {
            showNextMonth: "void-()",
            showNextYear: "void-()",
            showPreviousMonth: "void-()",
            showPreviousYear: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `Calendar allows selection of dates from a grid of days, similar to QCalendarWidget.

  The dates on the calendar can be selected with the mouse, or navigated with the keyboard.

  The selected date can be set through selectedDate. A minimum and maximum date can be set through minimumDate and maximumDate. The earliest minimum date that can be set is 1 January, 1 AD. The latest maximum date that can be set is 25 October, 275759 AD.

    Calendar {
      minimumDate: new Date(2017, 0, 1)
      maximumDate: new Date(2018, 0, 1)
    }
  The selected date is displayed using the format in the application's default locale.

  Week numbers can be displayed by setting the weekNumbersVisible property to true.

    Calendar {
      weekNumbersVisible: true
    }
  `,
        },
        inherit: "FocusScope",
    },
    CalendarStyle: {
        properties: {
            background: "Component",
            control: "Calendar",
            dayDelegate: "Component",
            dayOfWeekDelegate: "Component",
            gridColor: "color",
            gridVisible: "bool",
            navigationBar: "Component",
            weekNumberDelegate: "Component",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `
    Calendar {
      anchors.centerIn: parent

      style: CalendarStyle {
        gridVisible: false
        dayDelegate: Rectangle {
          gradient: Gradient {
            GradientStop {
              position: 0.00
              color: styleData.selected ? "#111" : (styleData.visibleMonth && styleData.valid ? "#444" : "#666");
            }
            GradientStop {
              position: 1.00
              color: styleData.selected ? "#444" : (styleData.visibleMonth && styleData.valid ? "#111" : "#666");
            }
            GradientStop {
              position: 1.00
              color: styleData.selected ? "#777" : (styleData.visibleMonth && styleData.valid ? "#111" : "#666");
            }
          }

          Label {
            text: styleData.date.getDate()
            anchors.centerIn: parent
            color: styleData.valid ? "white" : "grey"
          }

          Rectangle {
            width: parent.width
            height: 1
            color: "#555"
            anchors.bottom: parent.bottom
          }

          Rectangle {
            width: 1
            height: parent.height
            color: "#555"
            anchors.right: parent.right
          }
        }
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    Camera: {
        properties: {
            availability: "enumeration",
            cameraState: "enumeration",
            cameraStatus: "enumeration",
            captureMode: "enumeration",
            deviceId: "string",
            digitalZoom: "real",
            displayName: "string",
            errorCode: "enumeration",
            errorString: "string",
            lockStatus: "enumeration",
            maximumDigitalZoom: "real",
            maximumOpticalZoom: "real",
            mediaObject: "variant",
            metaData: {
                cameraManufacturer: "variant",
                cameraModel: "variant",
                dateTimeOriginal: "variant",
                event: "variant",
                gpsAltitude: "variant",
                gpsImgDirection: "variant",
                gpsLatitude: "variant",
                gpsLongitude: "variant",
                gpsProcessingMethod: "variant",
                gpsSpeed: "variant",
                gpsTimestamp: "variant",
                gpsTrack: "variant",
                orientation: "variant",
                subject: "variant",
            },
            opticalZoom: "real",
            orientation: "int",
            position: "enumeration",
            viewfinder: {
                maximumFrameRate: "real",
                minimumFrameRate: "real",
                resolution: "size",
            },
        },
        signals: {
            cameraStateChanged: "void-(state)",
            digitalZoomChanged: "void-(zoom)",
            errorOccurred: "void-(errorCode, errorString)",
            lockStatusChanged: "void-()",
            manualWhiteBalanceChanged: "void-()",
            maximumDigitalZoomChanged: "void-(zoom)",
            maximumOpticalZoomChanged: "void-(zoom)",
            opticalZoomChanged: "void-(zoom)",
            whiteBalanceModeChanged: "void-()",
        },
        methods: {
            searchAndLock: "void-()",
            start: "void-()",
            stop: "void-()",
            supportedViewfinderFrameRateRanges: "list<object>-(size resolution)",
            supportedViewfinderResolutions: "list<size>-(real minimumFrameRate, real maximumFrameRate)",
            unlock: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `You can use Camera to capture images and movies from a camera, and manipulate the capture and processing settings that get applied to the images. To display the viewfinder you can use VideoOutput with the Camera set as the source.

    Item {
      width: 640
      height: 360

      Camera {
        id: camera

        imageProcessing.whiteBalanceMode: CameraImageProcessing.WhiteBalanceFlash

        exposure {
          exposureCompensation: -1.0
          exposureMode: Camera.ExposurePortrait
        }

        flash.mode: Camera.FlashRedEyeReduction

        imageCapture {
          onImageCaptured: {
            photoPreview.source = preview  // Show the preview in an Image
          }
        }
      }

      VideoOutput {
        source: camera
        anchors.fill: parent
        focus : visible // to receive focus and capture key events when visible
      }

      Image {
        id: photoPreview
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    Camera3D: {
        properties: {
            cameraPreset: "Camera3D.CameraPreset",
            maxZoomLevel: "float",
            minZoomLevel: "float",
            target: "vector3d",
            wrapXRotation: "bool",
            wrapYRotation: "bool",
            xRotation: "float",
            yRotation: "float",
            zoomLevel: "float",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `Camera3D represents a basic orbit around centerpoint 3D camera that is used when rendering the data visualization. The type offers simple methods for rotating the camera around the origin and setting zoom level.`,
        },
        inherit: "QtObject",
    },
    CameraCapabilities: {
        properties: {
            maximumFieldOfView: "qreal",
            maximumTilt: "qreal",
            maximumZoomLevel: "qreal",
            minimumFieldOfView: "qreal",
            minimumTilt: "qreal",
            minimumZoomLevel: "qreal",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This includes the map minimum and maximum zoom level, minimum and maximum tilt angle and minimum and maximum field of view.`,
        },
        inherit: "QtObject",
    },
    CameraCapture: {
        properties: {
            capturedImagePath: "string",
            errorString: "string",
            ready: "bool",
            resolution: "size",
            supportedResolutions: "list<size>",
        },
        signals: {
            captureFailed: "void-(requestId, message)",
            imageCaptured: "void-(requestId, preview)",
            imageMetadataAvailable: "void-(requestId, key, value)",
            imageSaved: "void-(requestId, path)",
        },
        methods: {
            cancelCapture: "void-()",
            capture: "void-()",
            captureToLocation: "void-(location)",
            setMetadata: "void-(key, value)",
        },
        doc: {
            kind: "markdown",
            value: `This type allows you to capture still images and be notified when they are available or saved to disk. You can adjust the resolution of the captured image and where the saved image should go.

  CameraCapture is a child of a Camera (as the imageCapture property) and cannot be created directly.

    Item {
      width: 640
      height: 360

      Camera {
        id: camera

        imageCapture {
          onImageCaptured: {
            // Show the preview in an Image
            photoPreview.source = preview
          }
        }
      }

      VideoOutput {
        source: camera
        focus : visible // to receive focus and capture key events when visible
        anchors.fill: parent

        MouseArea {
          anchors.fill: parent;
          onClicked: camera.imageCapture.capture();
        }
      }

      Image {
        id: photoPreview
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    CameraExposure: {
        properties: {
            aperture: "real",
            exposureCompensation: "real",
            exposureMode: "enumeration",
            iso: "int",
            manualAperture: "real",
            manualIso: "real",
            manualShutterSpeed: "real",
            meteringMode: "enumeration",
            shutterSpeed: "real",
            spotMeteringPoint: "QPointF",
            supportedExposureModes: "list<ExposureMode>",
        },
        signals: {},
        methods: {
            setAutoAperture: "void-()",
            setAutoIsoSensitivity: "void-()",
            setAutoShutterSpeed: "void-()",
        },
        doc: {
            kind: "markdown",
            value: `CameraExposure allows you to adjust exposure related settings like aperture and shutter speed, metering and ISO speed.

  It should not be constructed separately, instead the exposure property of the a Camera should be used.

    Camera {
      id: camera

      exposure.exposureCompensation: -1.0
      exposure.exposureMode: Camera.ExposurePortrait
    }
  `,
        },
        inherit: "QtObject",
    },
    CameraFlash: {
        properties: {
            mode: "enumeration",
            ready: "bool",
            supportedModes: "list<FlashMode>",
        },
        signals: {
            flashModeChanged: "void-()",
            flashReady: "void-()",
        },
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type allows you to operate the camera flash hardware and control the flash mode used. Not all cameras have flash hardware (and in some cases it is shared with the torch hardware).

  It should not be constructed separately, instead the flash property of a Camera should be used.

    Camera {
      id: camera

      exposure.exposureCompensation: -1.0
      flash.mode: Camera.FlashRedEyeReduction
    }
  `,
        },
        inherit: "QtObject",
    },
    CameraFocus: {
        properties: {
            customFocusPoint: "point",
            focusMode: "enumeration",
            focusPointMode: "enumeration",
            focusZones: "list<focusZone>",
            supportedFocusModes: "list<FocusMode>",
            supportedFocusPointModes: "list<enumeration>",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `This type allows control over manual and automatic focus settings, including information about any parts of the camera frame that are selected for autofocusing.

  It should not be constructed separately, instead the focus property of a Camera should be used.

    Item {
      width: 640
      height: 360

      Camera {
        id: camera

        focus {
          focusMode: Camera.FocusMacro
          focusPointMode: Camera.FocusPointCustom
          customFocusPoint: Qt.point(0.2, 0.2) // Focus relative to top-left corner
        }
      }

      VideoOutput {
        source: camera
        anchors.fill: parent
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    CameraImageProcessing: {
        properties: {
            brightness: "qreal",
            colorFilter: "enumeration",
            contrast: "qreal",
            denoisingLevel: "qreal",
            isAvailable: "bool",
            manualWhiteBalance: "qreal",
            saturation: "qreal",
            sharpeningLevel: "qreal",
            supportedColorFilters: "list<ColorFilter>",
            supportedWhiteBalanceModes: "list<WhiteBalanceMode>",
            whiteBalanceMode: "enumeration",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: `CameraImageProcessing provides control over post-processing done by the camera middleware, including white balance adjustments, contrast, saturation, sharpening, and denoising

  It should not be constructed separately, instead the imageProcessing property of a Camera should be used.

    Camera {
      id: camera

      imageProcessing {
        whiteBalanceMode: Camera.WhiteBalanceTungsten
        contrast: 0.66
        saturation: -0.5
      }
    }
  `,
        },
        inherit: "QtObject",
    },
    CameraLens: {
        properties: {
            aspectRatio: "real",
            bottom: "real",
            farPlane: "real",
            fieldOfView: "real",
            left: "real",
            nearPlane: "real",
            projectionMatrix: "matrix4x4",
            projectionType: "enumeration",
            right: "real",
            top: "real",
        },
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: ``,
        },
        inherit: "QtObject",
    },
    Default: {
        properties: {},
        signals: {},
        methods: {},
        doc: {
            kind: "markdown",
            value: ``,
        },
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
    ToolTip: {
        properties: {
            delay: "int",
            text: "string",
            timeout: "int",
            toolTip: "ToolTip",
            visible: "bool",
        },
        signals: {},
        methods: {
            hide: "void-()",
            show: "void-(string text, int timeout)",
        },
        inherit: "Popup",
        doc: {
            kind: "markdown",
            value: `A tool tip is a short piece of text that informs the user of a control's function. It is typically placed above or below the parent control. The tip text can be any rich text formatted string.`,
        },
    },
};
exports.default = References;
//# sourceMappingURL=index.js.map