/* Whitelion catalogue data.
   Source: Whitelion Master Catalogue + AirQube Brochure 2026 V1.
   To add a product: copy one { ... } block inside "products" and edit it. */
window.WHITELION = {
  warranty: {
    years: 7,
    name: "AirCare+",
    text: "Every Whitelion installation is covered by the AirCare+ seven-year warranty, with long-term protection and worry-free service.",
    image: "img/whitelion/aircare-7.webp"
  },
  controlMethods: [
    { name: "Touch", detail: "Glass panels and smart displays on the wall" },
    { name: "Sensors", detail: "Motion, presence, door, window and more trigger scenes on their own" },
    { name: "Voice", detail: "Alexa, Google Home and Siri" },
    { name: "Remote", detail: "AirRemote handheld controller" },
    { name: "Mobile app", detail: "AirHome Pro on iPhone and Android, with widgets and Control Center" },
    { name: "Watch", detail: "Devices, scenes and schedules from Apple Watch and Wear OS" }
  ],
  installation: [
    { step: "Site visit", text: "We walk the home with you or your architect, room by room, and note every light, curtain, fan and appliance you want to control." },
    { step: "Plan and quote", text: "You get a room-wise plan: which panel goes where, what each button does, and the scenes we will set up." },
    { step: "Installation", text: "Whitelion-trained technicians fit the panels in place of your switches. Modular and retrofit designs fit existing boxes in most homes." },
    { step: "Set-up and handover", text: "We pair every device to the AirHome Pro app, create your scenes, and show the family how to use them." }
  ],
  series: [
    {
      id: "air", name: "Air Series", kind: "Smart touch panels",
      line: "Glass panels that run lights, curtains and scenes from one place.",
      image: "img/whitelion/q04-pro.webp", tone: "dark",
      products: [
        { name: "Q04", image: "img/whitelion/q04.webp", tagline: "Everything you need, beautifully integrated.",
          text: "Control lighting, curtains, climate and personalised scenes from a single panel.",
          features: ["4 relay outputs", "Custom scene control", "Two-way linkage", "Premium glass finish"],
          controls: ["Lights", "Curtains", "Climate", "Scenes"], finishes: ["Black", "Grey"] },
        { name: "Q08", image: "img/whitelion/q08.webp", tagline: "More control, more possibilities.",
          text: "Eight touch zones with a built-in motion sensor and haptic feedback.",
          features: ["4 smart switches + 4 scene controls", "Motion detection sensor", "Haptic feedback", "Custom scene control", "Two-way linkage"],
          controls: ["Lights", "Fans", "Scenes"], finishes: ["Black", "Grey"] },
        { name: "Q04 Pro", image: "img/whitelion/q04-pro.webp", tagline: "Smarter control, elevated experience.",
          text: "A glass panel with a vibrant built-in display for lighting, curtains, dimming and scenes.",
          features: ["Integrated smart display", "3 curtain controls", "4 custom scene controls", "4 dimming controls", "4 smart relay controls", "Motion wake-up sensor", "Time and weather display", "AirHome Pro app control"],
          controls: ["Lights", "Dimming", "Curtains", "Scenes"], finishes: ["Black", "Grey"] },
        { name: "Q91 socket", image: "img/whitelion/q91.webp", tagline: "Power, perfectly integrated.",
          text: "A premium 13A universal socket in the same glass finish as the panels.",
          features: ["13A universal socket", "Elegant, minimal design", "Safe and reliable"],
          controls: ["Power"], finishes: ["Black", "Grey"] },
        { name: "Q92 socket", image: "img/whitelion/q92.webp", tagline: "Power, with added convenience.",
          text: "The 13A universal socket with built-in USB and USB-C charging.",
          features: ["13A universal socket", "10W USB port", "15W USB Type-C port"],
          controls: ["Power", "Charging"], finishes: ["Black", "Grey"] }
      ]
    },
    {
      id: "display", name: "AirDisplay", kind: "Smart displays",
      line: "Wall-mounted touch screens that run the whole home.",
      image: "img/whitelion/display-10.webp", tone: "dark",
      products: [
        { name: "4 inch Smart Display", image: "img/whitelion/display-4.webp", tagline: "The heart of your smart home.",
          text: "Lighting, curtains, climate, security and scenes in one compact interface.",
          features: ["4\" HD touch display", "4 smart on/off controls", "Zigbee connectivity", "Smart lighting and curtain control", "Custom smart scenes", "Premium glass finish"],
          controls: ["Lights", "Curtains", "Climate", "Security", "Scenes"] },
        { name: "8 inch Smart Display", image: "img/whitelion/display-8.webp", tagline: "Your home at a glance.",
          text: "Lighting, climate, security, entertainment and automation on one immersive screen.",
          features: ["8\" Full HD touch display", "Built-in Alexa", "Zigbee and Bluetooth gateway", "Universal IR control", "Android 11", "Hi-Fi audio and amplifier support", "Customisable dashboard"],
          controls: ["Lights", "Climate", "TV and AC (IR)", "Music", "Security", "Scenes"] },
        { name: "10 inch Smart Display", image: "img/whitelion/display-10.webp", tagline: "The ultimate command centre.",
          text: "The flagship panel, with a camera and building intercom built in.",
          features: ["10.1\" Full HD touch display", "Built-in Alexa", "Zigbee and Bluetooth gateway", "Universal IR control", "Front camera and building intercom", "Proximity and ambient sensors", "Hi-Fi audio and amplifier support"],
          controls: ["Lights", "Curtains", "Climate", "TV and AC (IR)", "Intercom", "Security", "Scenes"] }
      ]
    },
    {
      id: "classic", name: "Posh, Quartz, AirTouch, AirGlass", kind: "Signature panel series",
      line: "Four panel designs, from numeric consoles to frameless glass.",
      image: "img/whitelion/airglass.webp", tone: "light",
      products: [
        { name: "Posh", image: "img/whitelion/posh.webp", tagline: "Meet the smart console.",
          text: "Comfort and intelligent control in one panel, with a numeric layout.",
          features: ["Modular and retrofit design", "Numeric design", "Child lock technology"], controls: ["Lights", "Fans", "Scenes"], finishes: ["Black", "White"] },
        { name: "Quartz", image: "img/whitelion/quartz.webp", tagline: "Purely smart, perfectly aesthetic.",
          text: "Simplicity with strength: as reliable as it is elegant.",
          features: ["Sleek aesthetic design", "Frameless glass", "Water guard display"], controls: ["Lights", "Fans", "Scenes"], finishes: ["Black", "White"] },
        { name: "AirTouch", image: "img/whitelion/airtouch.webp", tagline: "Air smooth finish.",
          text: "A seamless matte, ultra-responsive touch surface.",
          features: ["2mm toughened glass", "Snap-fit mechanism", "Smudge proof"], controls: ["Lights", "Fans", "Scenes"], finishes: ["Black", "White"] },
        { name: "AirGlass", image: "img/whitelion/airglass.webp", tagline: "Smart function, stunning form.",
          text: "A premium glass finish that blends into refined interiors.",
          features: ["Premium glass finish", "Protective bezel", "3kV surge protection"], controls: ["Lights", "Fans", "Scenes"], finishes: ["Black", "White", "Grey"] }
      ]
    },
    {
      id: "automation", name: "Automation", kind: "Curtains, locks and sensors",
      line: "The home that moves, locks and responds on its own.",
      image: "img/whitelion/aircurtain.webp", tone: "light",
      products: [
        { name: "AirCurtain", image: "img/whitelion/aircurtain.webp", tagline: "Invisible comfort, unmatched control.",
          text: "Motorised curtains that keep indoor comfort and energy use in check, on a schedule or a word.",
          features: ["Soft-touch activation", "Scheduled automation", "Voice control compatible"], controls: ["Curtains", "Blinds"] },
        { name: "AirLock", image: "img/whitelion/airlock.webp", tagline: "Dual-layer security with intelligent access.",
          text: "Smart door locks in two models, B1 and B1+, with several ways in and guest access.",
          features: ["Multiple unlock options", "Enhanced security", "Guest access"], controls: ["Main door", "Guest access"] },
        { name: "AirSensor", image: "img/whitelion/airsensor.webp", tagline: "Sense, respond, automate.",
          text: "Sensors that detect movement, presence and changes in the home, and trigger the right scene.",
          features: ["Battery alerts", "Smart scene linkage", "Energy efficient", "AirHome Pro app control"],
          controls: ["Motion", "Presence", "Door", "Window", "Temperature", "Smoke", "Gas", "Vibration"] }
      ]
    },
    {
      id: "connect", name: "Connectivity and control", kind: "Hubs, remotes and the app",
      line: "The quiet devices that link everything together.",
      image: "img/whitelion/airblaster.webp", tone: "light",
      products: [
        { name: "AirHome Pro app", image: "img/whitelion/app.webp", tagline: "One home, one app, limitless control.",
          text: "Control, monitor and manage every device from your phone, watch or computer, including a 3D view of your home on the web.",
          features: ["Remote access", "Family sharing", "Scenes and scheduling", "Real-time monitoring", "Geo-fencing", "Widgets and Control Center", "Apple Watch access", "Web version with 3D home"], controls: ["Everything connected"] },
        { name: "AirGateway", image: "img/whitelion/matter-gateway.webp", tagline: "The intelligence behind every connection.",
          text: "Zigbee Gateway and Zigbee Matter Pro hubs that keep every device talking reliably.",
          features: ["Zigbee mesh connectivity", "Scene and group management", "Apple HomeKit support (Matter Pro)", "OTA firmware updates"], controls: ["All Zigbee devices"] },
        { name: "AirBlaster", image: "img/whitelion/airblaster.webp", tagline: "One device, endless control.",
          text: "Turns traditional TVs, ACs and set-top boxes into connected devices.",
          features: ["Centralised control", "Compact design", "Wireless connectivity", "Easy set-up"], controls: ["TV", "AC", "Set-top box"] },
        { name: "AirRemote", image: "img/whitelion/airremote.webp", tagline: "Smart control, right in your hand.",
          text: "A sleek handheld for lighting, curtains and scenes.",
          features: ["One-touch smart control", "Custom scene activation", "Zigbee 3.0", "Long battery life"], controls: ["Lights", "Curtains", "Scenes"] },
        { name: "High Load Device", image: "img/whitelion/high-load.webp", tagline: "Heavy appliances, made smart.",
          text: "Seamless control of high-power appliances such as geysers and ACs.",
          features: ["High-power switching", "App control", "Scheduling"], controls: ["Geyser", "AC", "Pumps"] },
        { name: "AirChip", image: "img/whitelion/airchip.webp", tagline: "Keep your switches, add intelligence.",
          text: "A compact module that makes conventional switches smart.",
          features: ["Uninterrupted connectivity", "Effortless installation", "Remote control from anywhere"], controls: ["Existing switches"] }
      ]
    },
    {
      id: "lighting", name: "AirDriver", kind: "Lighting control",
      line: "Flicker-free dimming and colour for every light.",
      image: "img/whitelion/driver-cc.webp", tone: "light",
      products: [
        { name: "Dimming Driver (7–12W, 15–20W)", image: "img/whitelion/driver-cc.webp", tagline: "Precision dimming, reliable performance.",
          text: "Smooth, flicker-free dimming for downlights and spots.",
          features: ["Output current 360–500mA", "Input AC 85–265V", "Output DC 36V", "4kV surge protection", "Power factor ≥ 0.9"], controls: ["Dimmable lights"] },
        { name: "RGB + CW Controller", image: "img/whitelion/airdriver.webp", tagline: "Millions of colours.",
          text: "Colour and warm-to-cool white control for strips and cove lighting.",
          features: ["Input 12–24V DC", "Max load 10A (240W)", "RGB and cool-warm white", "Smooth dimming and scenes", "Zigbee"], controls: ["LED strips", "Cove lights"] }
      ]
    }
  ]
};
