/* =========================================================
   Felix Oketch — Solar Products Portfolio
   Product data, card rendering, hover actions, modal, cart
   and dynamic WhatsApp link generation.
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Configuration ---------- */
  const CONFIG = {
    whatsappNumber: "254707113706", // international format, no "+" or spaces
    currency: "KES",
    cartStorageKey: "fo-solar-cart",
    // Web3Forms access key: form submissions are emailed to the address on that
    // Web3Forms account. This key is designed to be public in website code.
    web3formsKey: "b3e780a2-201a-4e7b-8c3a-5b9bd5f63515",
  };

  /* ---------- Product catalog ----------
     LVTOPSUN 2026/2027 range. `price` is the selling price shown to
     customers (distributor price + KES 7,000 agent margin).
     To add a product: copy an object, give it a unique id and
     pick an `art` type: panel | battery | heater | inverter | controller | kit | light.
     `artValue` / `artSub` / `artLabel` set the text drawn on the illustration.
     To use a real photo instead, add `image: "images/your-file.jpg"`. */
  const PRODUCTS = [
    /* ===== Hybrid inverters ===== */
    {
      id: "lvts-4kw-hyd",
      model: "LVTS-4KW-HYD",
      name: "LVTOPSUN 4kW Hybrid Inverter",
      category: "inverters",
      categoryLabel: "Hybrid Inverters · 24V",
      price: 36000,
      badge: "3-yr warranty",
      art: "inverter",
      artValue: "4.0",
      artLabel: "HYBRID 4kW",
      short: "Compact 4kW pure sine wave hybrid inverter for 24V battery systems, with a built-in 120A MPPT solar charger.",
      description:
        "An all-in-one hybrid inverter for homes and small shops running on a 24V battery bank. It combines a pure sine wave inverter, a 120A MPPT solar charge controller and a grid/generator charger in one wall-mounted unit. It uses solar first, charges your batteries, and switches to battery or grid backup in just 4ms so lights, TVs and computers keep running without interruption. Works with both lithium and lead-acid batteries and can be monitored from your phone over Wi-Fi.",
      features: [
        "Pure sine wave output with 4ms UPS-level switchover",
        "120A MPPT solar charging, up to 4.4kW of panels",
        "Works with lithium (CAN/RS485) and lead-acid batteries",
        "Two AC outputs plus grid and generator input",
        "LCD display and Wi-Fi mobile app monitoring",
        "Up to 9 units in parallel for future expansion",
      ],
      specs: {
        "Model": "LVTS-4KW-HYD",
        "Rated Output Power": "4,000 W (PV + battery) / 3,300 W (battery only)",
        "Peak Apparent Power": "8,000 VA",
        "Battery System": "24 V (20–30 V), lithium or lead-acid",
        "Max. PV Input Power": "4,400 W",
        "Max. PV Input Voltage": "500 V",
        "MPPT Voltage Range": "60–450 V (1 MPPT, 18 A)",
        "Max. Solar / AC Charge Current": "120 A / 100 A",
        "AC Output": "230 V, 50/60 Hz pure sine wave (THDv < 3%)",
        "Transfer Time": "4 ms",
        "Efficiency": "94% peak · 99.9% MPPT",
        "Communication": "RS485, USB, CAN, Wi-Fi",
        "Dimensions / Weight": "290 × 424 × 120 mm · 7.1 kg",
        "Protection Rating": "IP20 (indoor)",
        "Warranty": "3 years",
      },
    },
    {
      id: "lvts-6kw-hyd",
      model: "LVTS-6KW-HYD",
      name: "LVTOPSUN 6kW Hybrid Inverter",
      category: "inverters",
      categoryLabel: "Hybrid Inverters · 48V",
      price: 46500,
      badge: "3-yr warranty",
      art: "inverter",
      artValue: "6.0",
      artLabel: "HYBRID 6kW",
      short: "6kW pure sine wave hybrid inverter for 48V systems with 7.8kW PV input and 4ms backup switching.",
      description:
        "A powerful 48V hybrid inverter that handles most family homes and small businesses. It accepts up to 7.8kW of solar panels, charges batteries at up to 120A and delivers 6,000W of clean pure sine wave power, with 12,000VA surge capacity for starting fridges, pumps and motors. Switchover to battery or grid takes only 4ms, and the unit connects to a generator and to lithium batteries over CAN/RS485 for smart charging.",
      features: [
        "6,000W continuous output, 12,000VA peak power",
        "Up to 7.8kW solar input, wide 90–500V MPPT range",
        "4ms transfer time — no flicker during outages",
        "Lithium and lead-acid compatible, CAN/RS485 communication",
        "Two AC outputs with grid and generator input",
        "LCD, LED and Wi-Fi app monitoring; parallel up to 9 units",
      ],
      specs: {
        "Model": "LVTS-6KW-HYD",
        "Rated Output Power": "6,000 W",
        "Peak Apparent Power": "12,000 VA",
        "Battery System": "48 V (42–60 V), lithium or lead-acid",
        "Max. PV Input Power": "7,800 W",
        "Max. PV Input Voltage": "550 V",
        "MPPT Voltage Range": "90–500 V (1 MPPT, 27 A)",
        "Max. Solar / AC Charge Current": "120 A / 100 A",
        "AC Output": "230 V, 50/60 Hz pure sine wave (THDv < 3%)",
        "Transfer Time": "4 ms",
        "Efficiency": "94% peak · 99.9% MPPT",
        "Communication": "RS485, USB, CAN, Wi-Fi",
        "Dimensions / Weight": "333 × 505 × 120 mm · 10.6 kg",
        "Protection Rating": "IP21 (indoor)",
        "Warranty": "3 years",
      },
    },
    {
      id: "lvts-12kw-hyd",
      model: "LVTS-12KW-HYD",
      name: "LVTOPSUN 12kW Hybrid Inverter",
      category: "inverters",
      categoryLabel: "Hybrid Inverters · 48V",
      price: 91000,
      badge: "5-yr warranty",
      badgeStyle: "green",
      art: "inverter",
      artValue: "12.0",
      artLabel: "HYBRID 12kW",
      short: "Dual-MPPT 12kW hybrid inverter with 18kW PV input. Runs with or without batteries; parallel up to 9 units.",
      description:
        "A heavy-duty single-phase hybrid inverter for large homes, offices, schools and commercial premises. Two MPPT trackers accept up to 18kW of solar panels (24kW recommended array), and the inverter delivers a full 12kW even in high temperatures. It can run with or without batteries, supports up to 280A battery discharge for big loads, has a dedicated generator port and smart load management across two AC outputs. Connect up to 9 units in parallel as your power needs grow.",
      features: [
        "12,000W output, 24,000VA peak — full power even in hot conditions",
        "Dual MPPT, up to 18kW PV input (24kW recommended array)",
        "Works with or without batteries",
        "Up to 250A solar charging and 280A battery discharge",
        "Generator port, smart load management, 4ms switchover",
        "Built-in Wi-Fi, LCD and app; parallel up to 9 units",
      ],
      specs: {
        "Model": "LVTS-12KW-HYD",
        "Rated Output Power": "12,000 W (single phase)",
        "Peak Apparent Power": "24,000 VA",
        "Battery System": "48 V (40–60 V), lithium or lead-acid",
        "Max. PV Input Power": "18,000 W (24,000 W recommended array)",
        "Max. PV Input Voltage": "500 V",
        "MPPT Voltage Range": "90–450 V (2 MPPTs, 30 A + 30 A)",
        "Max. Solar / AC Charge Current": "250 A / 210 A",
        "Max. Battery Discharge Current": "280 A",
        "AC Output": "230 V, 50/60 Hz pure sine wave (THDv < 5%)",
        "Transfer Time": "4 ms",
        "Efficiency": "94% peak · 99.9% MPPT",
        "Communication": "RS485, USB, CAN, built-in Wi-Fi, dry contact",
        "Parallel Capability": "Up to 9 units",
        "Dimensions / Weight": "625 × 400 × 120 mm · 17.9 kg",
        "Protection Rating": "IP21 (indoor)",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-15kw-hyd",
      model: "LVTS-15KW-HYD",
      name: "LVTOPSUN 15kW Three-Phase Hybrid Inverter",
      category: "inverters",
      categoryLabel: "Hybrid Inverters · 3-Phase",
      price: 189000,
      badge: "3-Phase · IP66",
      art: "inverter",
      artValue: "15.0",
      artLabel: "3-PHASE 15kW",
      short: "Three-phase 15kW hybrid inverter with 24kW PV input, 290A battery current, IP66 outdoor rating and app monitoring.",
      description:
        "A commercial-grade three-phase hybrid inverter for businesses, institutions, farms and large homes with three-phase supply. It handles up to 24kW of solar panels across two MPPTs with over 99.9% tracking efficiency, delivers 15kW of balanced three-phase power and supports 290A battery charge/discharge. The IP66 enclosure is dust- and water-tight for indoor or outdoor installation, and the system is monitored from the LCD or mobile app over Wi-Fi, Bluetooth or optional 4G/LAN.",
      features: [
        "15kW three-phase output (220/380 – 240/415 V)",
        "Up to 24kW PV input, 800V max input voltage, dual MPPT",
        "290A max battery charge/discharge, 48V lithium or lead-acid",
        "97.6% max efficiency, >99.9% MPPT efficiency",
        "IP66 rated — suitable for outdoor installation",
        "LCD + app monitoring; Wi-Fi/Bluetooth, optional 4G/LAN",
      ],
      specs: {
        "Model": "LVTS-15KW-HYD",
        "Rated Output Power": "15,000 W three-phase (16,500 VA max)",
        "Off-grid Peak Power": "2 × rated power for 10 s",
        "Grid Connection": "3L + N + PE, 220/380, 230/400, 240/415 V",
        "Battery System": "48 V (40–60 V), lithium or lead-acid",
        "Max. Battery Charge/Discharge": "290 A / 15,000 W",
        "Max. PV Input Power": "24,000 W (30,000 W recommended array)",
        "Max. PV Input Voltage": "800 V",
        "MPPT Voltage Range": "160–650 V (2 MPPTs, 27 A + 20 A)",
        "Switch Time": "4 ms",
        "Efficiency": "97.6% max · >99.9% MPPT",
        "Communication": "RS485, CAN, Bluetooth, Wi-Fi; LAN/4G optional",
        "Operating Temperature": "-40 °C to +60 °C (derating above 45 °C)",
        "Dimensions / Weight": "450 × 660 × 240 mm · 39 kg",
        "Protection Rating": "IP66 (indoor / outdoor)",
        "Warranty": "5 years",
      },
    },

    /* ===== 24V lithium batteries ===== */
    {
      id: "lvts-256100",
      model: "LVTS-256100",
      name: "LVTOPSUN 24V 100Ah Lithium Battery",
      category: "battery24",
      categoryLabel: "24V Lithium Batteries",
      price: 61000,
      badge: "5-yr warranty",
      art: "battery",
      artVariant: "lithium",
      artValue: "2.56",
      artSub: "kWh · 25.6V",
      short: "25.6V 100Ah (2.56kWh) wall-mount LiFePO4 battery with LCD display and 6,000-cycle life.",
      description:
        "A slim wall-mounted lithium iron phosphate battery that pairs perfectly with 24V hybrid inverters such as the LVTOPSUN 4kW. It stores 2.56kWh, delivers up to 100A, and lasts around 6,000 cycles at 80% depth of discharge — many years of daily use with no maintenance. The smart BMS protects the cells, the LCD shows charge status at a glance, and CAN/RS485 communication lets the inverter charge it correctly.",
      features: [
        "2.56kWh LiFePO4 storage with Grade A cells",
        "6,000 cycles at 80% depth of discharge",
        "Smart BMS with CAN / RS485 / RS232 communication",
        "LCD battery display",
        "Space-saving wall mount, maintenance-free",
        "Expandable: 2 in series, 4 in parallel",
      ],
      specs: {
        "Model": "LVTS-256100",
        "Nominal Voltage / Capacity": "25.6 V / 100 Ah",
        "Energy Storage": "2.56 kWh",
        "Charge Current / Power": "50 A / 1,280 W",
        "Discharge Current / Power": "100 A / 2,560 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "6,000 cycles @ 80% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Scalability": "Max 2 in series, 4 in parallel",
        "Installation": "Wall mount",
        "Dimensions / Weight": "330 × 135 × 420 mm · 26 kg",
        "Protection Rating": "IP20 (indoor)",
        "Certificates": "CE, UN38.3",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-256200",
      model: "LVTS-256200",
      name: "LVTOPSUN 24V 200Ah Lithium Battery",
      category: "battery24",
      categoryLabel: "24V Lithium Batteries",
      price: 87000,
      badge: "5-yr warranty",
      art: "battery",
      artVariant: "lithium",
      artValue: "5.12",
      artSub: "kWh · 25.6V",
      short: "25.6V 200Ah (5.12kWh) wall-mount LiFePO4 battery — double the backup for 24V systems.",
      description:
        "Twice the storage of the 100Ah model for 24V homes and businesses that need longer backup through the night or during long outages. This 5.12kWh LiFePO4 battery supports 100A charging and 160A discharge, has a smart BMS with LCD display, and communicates with your inverter over CAN/RS485/RS232. Rated for 6,000 cycles at 80% depth of discharge and expandable up to 63 batteries in parallel.",
      features: [
        "5.12kWh LiFePO4 storage with Grade A cells",
        "100A charge / 160A discharge current",
        "6,000 cycles at 80% depth of discharge",
        "Smart BMS, LCD display, CAN / RS485 / RS232",
        "Wall mount, maintenance-free",
        "Expandable up to 63 batteries in parallel",
      ],
      specs: {
        "Model": "LVTS-256200",
        "Nominal Voltage / Capacity": "25.6 V / 200 Ah",
        "Energy Storage": "5.12 kWh",
        "Voltage Range": "22.8 – 28.4 V",
        "Charge / Discharge Current": "100 A / 160 A",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "6,000 cycles @ 80% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Scalability": "Up to 63 in parallel",
        "Installation": "Wall mount",
        "Dimensions / Weight": "430 × 230 × 580 mm · 50 kg",
        "Protection Rating": "IP20 (indoor)",
        "Certificates": "CE, UN38.3",
        "Warranty": "5 years",
      },
    },

    /* ===== 48V lithium batteries ===== */
    {
      id: "lvts-512100-g3",
      model: "LVTS-512100-G3",
      name: "LVTOPSUN 48V 100Ah Lithium Battery (G3)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 87000,
      badge: "5-yr warranty",
      art: "battery",
      artVariant: "lithium",
      artValue: "5.12",
      artSub: "kWh · 51.2V",
      short: "51.2V 100Ah (5.12kWh) LiFePO4 power wall with smart BMS, LCD and 6,000 cycles at 90% DOD.",
      description:
        "The most popular size for 48V hybrid systems. This 5.12kWh lithium iron phosphate power wall mounts on the wall or stands on the floor, delivers up to 100A (5,120W) and is rated for 6,000 cycles at 90% depth of discharge. The smart BMS protects every cell, the LCD shows state of charge, and CAN/RS485/RS232 communication works with mainstream hybrid inverters. Add up to 15 batteries in parallel as your needs grow.",
      features: [
        "5.12kWh LiFePO4 storage with Grade A cells",
        "6,000 cycles at 90% depth of discharge",
        "50A charge / 100A discharge (5,120W)",
        "Smart BMS with LCD display",
        "CAN / RS485 / RS232 — works with mainstream inverters",
        "Wall or floor mount; up to 15 in parallel",
      ],
      specs: {
        "Model": "LVTS-512100-G3",
        "Nominal Voltage / Capacity": "51.2 V / 100 Ah",
        "Energy Storage": "5.12 kWh",
        "Working Voltage": "45.6 – 56.16 V",
        "Charge Current / Power": "50 A / 2,560 W",
        "Discharge Current / Power": "100 A / 5,120 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "6,000 cycles @ 90% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Scalability": "Up to 15 in parallel",
        "Installation": "Floor stand or wall mount",
        "Dimensions / Weight": "440 × 138 × 600 mm · 47.3 kg",
        "Protection Rating": "IP20 (indoor)",
        "Certificates": "CE, UN38.3, RoHS",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-512200-g3",
      model: "LVTS-512200-G3",
      name: "LVTOPSUN 48V 200Ah Lithium Battery (G3)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 155000,
      badge: "5-yr warranty",
      art: "battery",
      artVariant: "lithium",
      artValue: "10.24",
      artSub: "kWh · 51.2V",
      short: "51.2V 200Ah (10.24kWh) LiFePO4 battery with 100A charge / 170A discharge for all-night backup.",
      description:
        "A 10.24kWh lithium battery for homes and businesses that want to run through the night on solar energy stored during the day. It charges at up to 100A and discharges at up to 170A (8,704W), so it can carry heavy loads such as fridges, pumps and office equipment. Smart BMS protection, an LCD display and CAN/RS485/RS232 communication come standard, with 6,000 cycles at 90% depth of discharge and up to 63 batteries in parallel.",
      features: [
        "10.24kWh LiFePO4 storage with Grade A cells",
        "100A charge / 170A discharge (up to 8,704W)",
        "6,000 cycles at 90% depth of discharge",
        "Smart BMS with LCD display",
        "CAN / RS485 / RS232 communication",
        "Floor or wall mount; up to 63 in parallel",
      ],
      specs: {
        "Model": "LVTS-512200-G3",
        "Nominal Voltage / Capacity": "51.2 V / 200 Ah",
        "Energy Storage": "10.24 kWh",
        "Working Voltage": "45.6 – 56.16 V",
        "Max. Charge Current / Power": "100 A / 5,120 W",
        "Max. Discharge Current / Power": "170 A / 8,704 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "6,000 cycles @ 90% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Scalability": "Up to 63 in parallel",
        "Installation": "Floor stand or wall mount",
        "Dimensions / Weight": "450 × 230 × 680 mm · 83.5 kg",
        "Protection Rating": "IP20 (indoor)",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-512228-g3",
      model: "LVTS-512228-G3",
      name: "LVTOPSUN 48V 228Ah Lithium Battery (G3)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 157000,
      badge: "Fire suppression",
      badgeStyle: "green",
      art: "battery",
      artVariant: "lithium",
      artValue: "11.67",
      artSub: "kWh · 51.2V",
      short: "51.2V 228Ah (11.67kWh) LiFePO4 battery with automatic fire suppression and Bluetooth/Wi-Fi monitoring.",
      description:
        "An 11.67kWh lithium iron phosphate battery with extra safety and smart features built in. An automatic fire-suppression device adds a layer of protection on top of the smart BMS, and Bluetooth and Wi-Fi let you check charge level and battery health from your phone. Communicates with mainstream hybrid inverters over CAN/RS485/RS232 and is rated for up to 6,000 cycles at 90% depth of discharge. Full manufacturer datasheet available on request.",
      features: [
        "11.67kWh LiFePO4 storage",
        "Automatic fire suppression for added safety",
        "Bluetooth and Wi-Fi monitoring from your phone",
        "Smart BMS protection",
        "CAN / RS485 / RS232 communication",
        "Up to 6,000 cycles at 90% depth of discharge",
      ],
      specs: {
        "Model": "LVTS-512228-G3",
        "Nominal Voltage / Capacity": "51.2 V / 228 Ah",
        "Energy Storage": "11.67 kWh",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "Up to 6,000 cycles @ 90% DOD",
        "Safety": "Smart BMS + automatic fire suppression",
        "Monitoring": "Bluetooth & Wi-Fi",
        "Communication": "CAN, RS485, RS232",
        "Full Datasheet": "Available on request",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-512314-g3",
      model: "LVTS-512314-G3",
      name: "LVTOPSUN 48V 314Ah Lithium Battery (G3)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 202000,
      badge: "8,000 cycles",
      art: "battery",
      artVariant: "lithium",
      artValue: "16.07",
      artSub: "kWh · 51.2V",
      short: "51.2V 314Ah (16.07kWh) high-capacity LiFePO4 battery with 150A charge / 200A discharge and 8,000-cycle life.",
      description:
        "A high-capacity 16.07kWh battery for large homes, offices and institutions that need serious backup. It charges at 150A (7,680W) and discharges at 200A (10,240W), enough to support a 10–12kW hybrid inverter running heavy loads. Built with Grade A LiFePO4 cells rated for 8,000 cycles at 90% depth of discharge, it offers excellent value per kWh over its lifetime. Smart BMS, LCD display and CAN/RS485/RS232 communication included.",
      features: [
        "16.07kWh LiFePO4 storage with Grade A cells",
        "8,000 cycles at 90% depth of discharge",
        "150A charge / 200A discharge (10,240W)",
        "Smart BMS with LCD display",
        "CAN / RS485 / RS232 communication",
        "CE and UN38.3 certified",
      ],
      specs: {
        "Model": "LVTS-512314-G3",
        "Nominal Voltage / Capacity": "51.2 V / 314 Ah",
        "Energy Storage": "16.07 kWh",
        "Max. Charge Current / Power": "150 A / 7,680 W",
        "Max. Discharge Current / Power": "200 A / 10,240 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "8,000 cycles @ 90% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Dimensions / Weight": "450 × 230 × 866 mm · 119 kg",
        "Protection Rating": "IP20 (indoor)",
        "Certificates": "CE, UN38.3",
        "Warranty": "5 years",
      },
    },
    {
      id: "lvts-512314-g4",
      model: "LVTS-512314-G4",
      name: "LVTOPSUN 48V 314Ah Lithium Battery (G4, IP65)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 212000,
      badge: "10-yr warranty",
      badgeStyle: "green",
      art: "battery",
      artVariant: "lithium",
      artValue: "16.07",
      artSub: "kWh · IP65",
      short: "Premium 16.07kWh LiFePO4 battery with IP65 rating, automatic fire suppression, Bluetooth/Wi-Fi and a 10-year warranty.",
      description:
        "LVTOPSUN's premium 16kWh battery, built for maximum safety and durability. The IP65 enclosure is dust- and water-resistant, an automatic sensing fire-extinguishing device provides 24-hour protection, and Bluetooth/Wi-Fi monitoring puts battery status on your phone. Grade A LiFePO4 cells deliver 8,000 cycles at 90% depth of discharge, the unit rolls into place on its floor stand, and it's backed by a 10-year warranty.",
      features: [
        "16.07kWh LiFePO4 storage with Grade A cells",
        "IP65 dust- and water-resistant enclosure",
        "Automatic fire suppression — 24-hour protection",
        "Bluetooth and Wi-Fi monitoring, touchscreen display",
        "8,000 cycles at 90% depth of discharge",
        "10-year warranty; up to 63 in parallel",
      ],
      specs: {
        "Model": "LVTS-512314-G4",
        "Nominal Voltage / Capacity": "51.2 V / 314 Ah",
        "Energy Storage": "16.07 kWh",
        "Working Voltage": "45.6 – 56.16 V",
        "Charge Current / Power": "150 A / 7,680 W",
        "Discharge Current / Power": "200 A / 10,240 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "8,000 cycles @ 90% DOD",
        "Safety & Monitoring": "Auto fire suppression, Bluetooth, Wi-Fi",
        "Communication": "RS232, RS485, CAN",
        "Display": "SOC indicator, LCD touchscreen",
        "Scalability": "Up to 63 in parallel",
        "Installation": "Floor stand (on wheels)",
        "Dimensions / Weight": "480 × 235 × 874 mm · 120 kg",
        "Protection Rating": "IP65",
        "Warranty": "10 years",
      },
    },
    {
      id: "lvts-512628",
      model: "LVTS-512628",
      name: "LVTOPSUN 48V 628Ah Lithium Battery (32kWh)",
      category: "battery48",
      categoryLabel: "48V Lithium Batteries",
      price: 387000,
      badge: "32kWh",
      art: "battery",
      artVariant: "lithium",
      artValue: "32",
      artSub: "kWh · 51.2V",
      short: "Massive 32kWh LiFePO4 energy store on wheels for institutions, businesses and off-grid properties.",
      description:
        "A 32kWh floor-standing lithium battery for schools, hospitals, hotels, businesses and off-grid properties that need to run for long hours on stored solar energy. One unit replaces a whole rack of smaller batteries, charging at 150A and discharging at 200A, with Grade A LiFePO4 cells rated for 8,000 cycles at 90% depth of discharge. Smart BMS, LCD display and CAN/RS485/RS232 communication included, and up to 63 units can be connected in parallel.",
      features: [
        "32kWh LiFePO4 storage in a single cabinet",
        "8,000 cycles at 90% depth of discharge",
        "150A charge / 200A discharge (10,240W)",
        "Smart BMS with LCD display",
        "CAN / RS485 / RS232 communication",
        "Floor stand on wheels; up to 63 in parallel",
      ],
      specs: {
        "Model": "LVTS-512628",
        "Nominal Voltage / Capacity": "51.2 V / 628 Ah",
        "Energy Storage": "32 kWh",
        "Charge Current / Power": "150 A / 7,680 W",
        "Discharge Current / Power": "200 A / 10,240 W",
        "Cell Technology": "LiFePO4 (lithium iron phosphate)",
        "Cycle Life": "8,000 cycles @ 90% DOD",
        "Communication": "CAN, RS485, RS232",
        "Display": "LCD",
        "Scalability": "Up to 63 in parallel",
        "Installation": "Floor stand (on wheels)",
        "Dimensions / Weight": "325 × 800 × 900 mm · 240 kg",
        "Protection Rating": "IP20 (indoor)",
        "Certificates": "CE, UN38.3",
        "Warranty": "5 years",
      },
    },
  ];

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const fmt = (n) => `${CONFIG.currency} ${Number(n).toLocaleString("en-KE")}`;
  const escapeHTML = (str) =>
    String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /** Build a WhatsApp click-to-chat URL with a pre-filled message. */
  const waLink = (message) =>
    `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

  const orderMessage = (p) => `I'm interested in ordering ${p.name}${p.model ? ` (${p.model})` : ""}`;
  const installMessage = (p) =>
    `Hello Felix, I'd like to enquire about installation of the ${p.name} (${fmt(p.price)}). Please advise on a site visit and installation cost.`;

  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

  /* ---------- Product illustrations (inline SVG placeholders) ---------- */
  let artUid = 0;
  function productArt(p) {
    if (p.image) {
      return `<img class="product-art" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" style="object-fit:cover">`;
    }
    const u = `a${++artUid}`;
    const bg = `
      <defs>
        <linearGradient id="${u}bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#e8fbf3"/><stop offset="1" stop-color="#fff8d6"/>
        </linearGradient>
        <radialGradient id="${u}sun" cx=".5" cy=".5" r=".5">
          <stop offset="0" stop-color="#fde047"/><stop offset=".6" stop-color="#facc15"/><stop offset="1" stop-color="#facc15" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="${u}cell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#1e3a5f"/><stop offset="1" stop-color="#0f1b2d"/>
        </linearGradient>
        <linearGradient id="${u}metal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#f8fafc"/><stop offset="1" stop-color="#cbd5e1"/>
        </linearGradient>
        <linearGradient id="${u}green" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#34d399"/><stop offset="1" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill="url(#${u}bg)"/>
      <circle cx="340" cy="58" r="70" fill="url(#${u}sun)" opacity=".85"/>
      <ellipse cx="200" cy="268" rx="150" ry="12" fill="#0f1b2d" opacity=".08"/>`;

    let body = "";
    switch (p.art) {
      case "panel": {
        let cells = "";
        for (let r = 0; r < 6; r++)
          for (let c = 0; c < 4; c++)
            cells += `<rect x="${118 + c * 42}" y="${42 + r * 34}" width="38" height="30" rx="2" fill="url(#${u}cell)"/>`;
        body = `
          <g transform="rotate(-6 200 150)">
            <rect x="110" y="34" width="180" height="218" rx="6" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
            ${cells}
            <path d="M118 42 L288 42 L240 140 L118 120Z" fill="#fff" opacity=".12"/>
          </g>
          <rect x="185" y="250" width="30" height="14" rx="3" fill="#64748b"/>`;
        break;
      }
      case "battery": {
        const lithium = p.artVariant === "lithium";
        body = lithium
          ? `
          <rect x="120" y="50" width="160" height="210" rx="16" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="120" y="50" width="160" height="40" rx="16" fill="#0f1b2d"/>
          <rect x="120" y="74" width="160" height="16" fill="#0f1b2d"/>
          <circle cx="146" cy="70" r="6" fill="#34d399"/><circle cx="166" cy="70" r="6" fill="#facc15"/>
          <text x="262" y="75" text-anchor="end" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#fff">LiFePO4</text>
          <rect x="145" y="120" width="110" height="18" rx="9" fill="#e2e8f0"/>
          <rect x="145" y="120" width="96" height="18" rx="9" fill="url(#${u}green)"/>
          <text x="200" y="185" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="30" font-weight="700" fill="#0f1b2d">${escapeHTML(p.artValue || "5.12")}</text>
          <text x="200" y="208" text-anchor="middle" font-family="Inter, sans-serif" font-size="14" fill="#475569">${escapeHTML(p.artSub || "kWh · 51.2V")}</text>
          <path d="M193 225 l-8 16 h10 l-4 14 14-20 h-10 l6-10z" fill="#facc15"/>`
          : `
          <rect x="140" y="60" width="26" height="18" rx="3" fill="#dc2626"/>
          <rect x="234" y="60" width="26" height="18" rx="3" fill="#0f1b2d"/>
          <rect x="100" y="74" width="200" height="180" rx="14" fill="#16263d"/>
          <rect x="100" y="74" width="200" height="36" rx="14" fill="#22364f"/>
          <rect x="100" y="96" width="200" height="14" fill="#22364f"/>
          <rect x="120" y="128" width="160" height="80" rx="8" fill="url(#${u}green)"/>
          <text x="200" y="168" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="30" font-weight="700" fill="#fff">200Ah</text>
          <text x="200" y="192" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" font-weight="600" fill="#ecfdf5">12V DEEP CYCLE GEL</text>
          <path d="M193 218 l-8 14 h10 l-4 14 14-20 h-10 l6-8z" fill="#facc15"/>`;
        break;
      }
      case "heater": {
        let tubes = "";
        for (let i = 0; i < 9; i++) {
          const x = 108 + i * 22;
          tubes += `<line x1="${x}" y1="110" x2="${x - 50}" y2="240" stroke="#0f1b2d" stroke-width="13" stroke-linecap="round"/>
                    <line x1="${x - 2}" y1="114" x2="${x - 48}" y2="234" stroke="#64748b" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
        }
        body = `
          ${tubes}
          <line x1="60" y1="240" x2="300" y2="240" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <line x1="300" y1="100" x2="300" y2="240" stroke="#94a3b8" stroke-width="5" stroke-linecap="round"/>
          <rect x="80" y="74" width="240" height="50" rx="25" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="96" y="86" width="40" height="26" rx="6" fill="#facc15" opacity=".9"/>
          <text x="116" y="104" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="12" font-weight="700" fill="#0f1b2d">300L</text>
          <path d="M330 150 q8 -12 0 -24 q-8 -12 0 -24" stroke="#f97316" stroke-width="4" fill="none" opacity=".7"/>
          <path d="M350 160 q8 -12 0 -24 q-8 -12 0 -24" stroke="#f97316" stroke-width="4" fill="none" opacity=".5"/>`;
        break;
      }
      case "inverter":
        body = `
          <rect x="120" y="40" width="160" height="222" rx="16" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="138" y="62" width="124" height="70" rx="8" fill="#0f1b2d"/>
          <text x="152" y="92" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="700" fill="#34d399">${escapeHTML(p.artValue || "4.86")}</text>
          <text x="210" y="92" font-family="Inter, sans-serif" font-size="11" fill="#94a3b8">kW</text>
          <rect x="152" y="104" width="96" height="8" rx="4" fill="#22364f"/>
          <rect x="152" y="104" width="78" height="8" rx="4" fill="#facc15"/>
          <circle cx="160" cy="154" r="6" fill="#34d399"/><circle cx="182" cy="154" r="6" fill="#facc15"/><circle cx="204" cy="154" r="6" fill="#cbd5e1"/>
          <rect x="140" y="180" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <rect x="140" y="194" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <rect x="140" y="208" width="120" height="6" rx="3" fill="#cbd5e1"/>
          <text x="200" y="245" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="15" font-weight="700" fill="#059669">${escapeHTML(p.artLabel || "HYBRID")}</text>`;
        break;
      case "controller":
        body = `
          <rect x="110" y="70" width="180" height="170" rx="14" fill="#16263d"/>
          <rect x="110" y="70" width="180" height="26" rx="13" fill="#22364f"/>
          <rect x="132" y="106" width="136" height="56" rx="6" fill="#bef264" opacity=".9"/>
          <text x="200" y="142" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="22" font-weight="700" fill="#0f1b2d">13.8V · 42A</text>
          <rect x="140" y="176" width="28" height="12" rx="6" fill="#34d399"/>
          <rect x="186" y="176" width="28" height="12" rx="6" fill="#facc15"/>
          <rect x="232" y="176" width="28" height="12" rx="6" fill="#64748b"/>
          ${[0, 1, 2, 3, 4, 5].map((i) => `<rect x="${128 + i * 25}" y="204" width="17" height="22" rx="3" fill="#475569"/>`).join("")}
          <text x="200" y="88" text-anchor="middle" font-family="Inter, sans-serif" font-size="11" font-weight="700" fill="#facc15">MPPT 60A</text>`;
        break;
      case "kit": {
        let mini = "";
        for (let r = 0; r < 3; r++)
          for (let c = 0; c < 4; c++)
            mini += `<rect x="${62 + c * 26}" y="${62 + r * 32}" width="23" height="29" rx="2" fill="url(#${u}cell)"/>`;
        body = `
          <g transform="rotate(-8 115 110)">
            <rect x="56" y="56" width="116" height="108" rx="5" fill="#cbd5e1"/>${mini}
          </g>
          <rect x="196" y="70" width="86" height="120" rx="12" fill="url(#${u}metal)" stroke="#94a3b8" stroke-width="2"/>
          <rect x="208" y="84" width="62" height="34" rx="5" fill="#0f1b2d"/>
          <text x="239" y="106" text-anchor="middle" font-family="Space Grotesk, sans-serif" font-size="13" font-weight="700" fill="#34d399">1.5kVA</text>
          <circle cx="220" cy="136" r="5" fill="#34d399"/><circle cx="238" cy="136" r="5" fill="#facc15"/>
          <rect x="296" y="140" width="76" height="104" rx="10" fill="#16263d"/>
          <rect x="306" y="166" width="56" height="40" rx="6" fill="url(#${u}green)"/>
          <path d="M332 174 l-6 12 h8 l-3 12 11-16 h-8 l4-8z" fill="#facc15"/>
          <rect x="74" y="190" width="104" height="64" rx="10" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
          <path d="M98 238 v-22 l28 -18 l28 18 v22z" fill="#facc15"/>
          <rect x="118" y="222" width="16" height="16" fill="#0f1b2d"/>
          <path d="M172 130 C 185 130, 185 130, 196 130" stroke="#0f1b2d" stroke-width="3" stroke-dasharray="5 4"/>
          <path d="M282 160 C 290 160, 290 180, 296 180" stroke="#0f1b2d" stroke-width="3" stroke-dasharray="5 4"/>`;
        break;
      }
      case "light":
        body = `
          <rect x="60" y="160" width="100" height="70" rx="4" fill="#cbd5e1" transform="rotate(-10 110 195)"/>
          <g transform="rotate(-10 110 195)">
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${65 + c * 24}" y="${165 + r * 21}" width="21" height="18" rx="1.5" fill="url(#${u}cell)"/>`).join("")).join("")}
          </g>
          <path d="M160 200 C 200 220, 220 200, 236 170" stroke="#0f1b2d" stroke-width="3" fill="none"/>
          <path d="M210 120 L 380 60 L 380 280 L 210 170Z" fill="#fde047" opacity=".35"/>
          <rect x="190" y="88" width="120" height="100" rx="10" fill="#16263d" transform="rotate(8 250 138)"/>
          <g transform="rotate(8 250 138)">
            <rect x="202" y="100" width="96" height="76" rx="6" fill="#fef9c3"/>
            ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<circle cx="${216 + c * 23}" cy="${115 + r * 23}" r="7" fill="#facc15"/>`).join("")).join("")}
          </g>
          <rect x="240" y="186" width="20" height="40" rx="4" fill="#475569"/>`;
        break;
      default:
        body = "";
    }
    return `<svg class="product-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${escapeHTML(p.name)} illustration" style="stroke:none">${bg}${body}</svg>`;
  }

  /* ---------- Render product cards ---------- */
  const grid = $("#productGrid");

  function renderProducts() {
    grid.innerHTML = PRODUCTS.map(
      (p, i) => `
      <article class="product-card" data-id="${p.id}" data-category="${p.category}" tabindex="0"
               aria-label="${escapeHTML(p.name)}, ${fmt(p.price)}. Press Enter for details." style="animation-delay:${i * 60}ms">
        <div class="card-media">
          ${p.badge ? `<span class="card-badge ${p.badgeStyle || ""}">${escapeHTML(p.badge)}</span>` : ""}
          ${productArt(p)}
          <div class="card-overlay">
            <button type="button" class="btn btn-cart" data-action="add" data-id="${p.id}">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 8H6.2"/><path d="M12 9v4M10 11h4"/></svg>
              Add to Cart
            </button>
            <a class="btn btn-whatsapp" data-action="whatsapp" href="${waLink(orderMessage(p))}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" class="wa-icon" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3Z"/></svg>
              Order on WhatsApp
            </a>
            <span class="overlay-hint">or click the card for full specs</span>
          </div>
        </div>
        <div class="card-body">
          <span class="card-cat">${escapeHTML(p.categoryLabel)}</span>
          <h3 class="card-title">${escapeHTML(p.name)}</h3>
          <p class="card-desc">${escapeHTML(p.short)}</p>
          <div class="card-foot">
            <span class="card-price">${fmt(p.price)}<small>Indicative price</small></span>
            <span class="card-more">Details <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
          </div>
          <div class="card-mobile-actions">
            <button type="button" class="btn btn-cart" data-action="add" data-id="${p.id}">Add to Cart</button>
            <a class="btn btn-whatsapp" data-action="whatsapp" href="${waLink(orderMessage(p))}" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </div>
        </div>
      </article>`
    ).join("");
  }

  // Event delegation: action buttons vs. opening the modal
  grid.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      e.stopPropagation();
      if (actionEl.dataset.action === "add") {
        e.preventDefault();
        addToCart(actionEl.dataset.id);
      }
      return; // WhatsApp links follow their href
    }
    const card = e.target.closest(".product-card");
    if (card) openModal(card.dataset.id, card);
  });

  grid.addEventListener("keydown", (e) => {
    if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("product-card")) {
      e.preventDefault();
      openModal(e.target.dataset.id, e.target);
    }
  });

  /* ---------- Category filters ---------- */
  $("#filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter").forEach((b) => {
      const on = b === btn;
      b.classList.toggle("active", on);
      b.setAttribute("aria-selected", String(on));
    });
    const f = btn.dataset.filter;
    $$(".product-card", grid).forEach((card) => {
      card.classList.toggle("hidden", f !== "all" && card.dataset.category !== f);
    });
  });

  /* ---------- Product modal ---------- */
  const modal = $("#productModal");
  let lastFocused = null;
  let currentProduct = null;

  function openModal(id, trigger) {
    const p = findProduct(id);
    if (!p) return;
    currentProduct = p;
    lastFocused = trigger || document.activeElement;

    $("#modalMedia").innerHTML = productArt(p);
    $("#modalCat").textContent = p.categoryLabel;
    $("#modalTitle").textContent = p.name;
    $("#modalPrice").innerHTML = `${fmt(p.price)}<small>Installation quoted separately</small>`;
    $("#modalDesc").textContent = p.description;
    $("#modalFeatures").innerHTML = p.features.map((f) => `<li>${escapeHTML(f)}</li>`).join("");
    $("#modalSpecs").innerHTML = Object.entries(p.specs)
      .map(([k, v]) => `<tr><th scope="row">${escapeHTML(k)}</th><td>${escapeHTML(v)}</td></tr>`)
      .join("");
    $("#modalWhatsApp").href = waLink(orderMessage(p));
    $("#modalInstall").href = waLink(installMessage(p));

    modal.hidden = false;
    document.body.classList.add("no-scroll");
    $(".modal-body", modal).scrollTop = 0;
    $(".modal-panel", modal).scrollTop = 0;
    requestAnimationFrame(() => $(".modal-close", modal).focus());
  }

  function closeModal() {
    if (modal.hidden) return;
    modal.hidden = true;
    currentProduct = null;
    if (!cartDrawer.classList.contains("open")) document.body.classList.remove("no-scroll");
    if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });

  $("#modalAddCart").addEventListener("click", () => {
    if (currentProduct) addToCart(currentProduct.id);
  });

  // Keep keyboard focus inside open dialogs
  function trapFocus(container, e) {
    const focusables = $$('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])', container).filter(
      (el) => el.offsetParent !== null
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (!modal.hidden) closeModal();
      else if (cartDrawer.classList.contains("open")) closeCart();
    }
    if (e.key === "Tab") {
      if (!modal.hidden) trapFocus(modal, e);
      else if (cartDrawer.classList.contains("open")) trapFocus(cartDrawer, e);
    }
  });

  /* ---------- Cart ---------- */
  const cartDrawer = $("#cartDrawer");
  const drawerBackdrop = $("#drawerBackdrop");
  const cartBtn = $("#cartBtn");
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(CONFIG.cartStorageKey) || "{}");
      // Drop anything that no longer exists in the catalog
      return Object.fromEntries(
        Object.entries(raw).filter(([id, q]) => findProduct(id) && Number.isInteger(q) && q > 0)
      );
    } catch {
      return {};
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(CONFIG.cartStorageKey, JSON.stringify(cart));
    } catch {
      /* storage unavailable (private mode) — cart still works for this visit */
    }
  }

  function addToCart(id, qty = 1) {
    const p = findProduct(id);
    if (!p) return;
    cart[id] = (cart[id] || 0) + qty;
    saveCart();
    renderCart();
    showToast(`${p.name} added to cart`);
    const badge = $("#cartCount");
    badge.classList.remove("bump");
    void badge.offsetWidth; // restart animation
    badge.classList.add("bump");
  }

  function setQty(id, qty) {
    if (qty <= 0) delete cart[id];
    else cart[id] = qty;
    saveCart();
    renderCart();
  }

  function renderCart() {
    const entries = Object.entries(cart);
    const count = entries.reduce((n, [, q]) => n + q, 0);
    const total = entries.reduce((sum, [id, q]) => sum + findProduct(id).price * q, 0);

    const badge = $("#cartCount");
    badge.textContent = count;
    badge.classList.toggle("show", count > 0);
    cartBtn.setAttribute("aria-label", `Open cart (${count} item${count === 1 ? "" : "s"})`);

    $("#cartEmpty").hidden = count > 0;
    $("#cartFoot").hidden = count === 0;
    $("#cartTotal").textContent = fmt(total);

    $("#cartItems").innerHTML = entries
      .map(([id, q]) => {
        const p = findProduct(id);
        return `
        <li class="cart-item" data-id="${id}">
          <div class="cart-thumb">${productArt(p)}</div>
          <div class="cart-info">
            <h3>${escapeHTML(p.name)}</h3>
            <p>${fmt(p.price)}</p>
            <div class="qty" aria-label="Quantity">
              <button type="button" data-qty="-1" aria-label="Decrease quantity">−</button>
              <span>${q}</span>
              <button type="button" data-qty="1" aria-label="Increase quantity">+</button>
            </div>
          </div>
          <div>
            <div class="cart-line">${fmt(p.price * q)}</div>
            <button type="button" class="remove-btn" data-remove>Remove</button>
          </div>
        </li>`;
      })
      .join("");

    if (count > 0) {
      const lines = entries.map(([id, q]) => {
        const p = findProduct(id);
        return `• ${q} × ${p.name} — ${fmt(p.price * q)}`;
      });
      const msg = `Hello Felix, I'm interested in ordering the following solar products:\n\n${lines.join("\n")}\n\nEstimated total: ${fmt(total)}\n\nPlease confirm availability and delivery/installation details.`;
      $("#cartCheckout").href = waLink(msg);
    }
  }

  $("#cartItems").addEventListener("click", (e) => {
    const item = e.target.closest(".cart-item");
    if (!item) return;
    const id = item.dataset.id;
    const qtyBtn = e.target.closest("[data-qty]");
    if (qtyBtn) setQty(id, (cart[id] || 0) + Number(qtyBtn.dataset.qty));
    if (e.target.closest("[data-remove]")) setQty(id, 0);
  });

  $("#cartClear").addEventListener("click", () => {
    cart = {};
    saveCart();
    renderCart();
  });

  function openCart() {
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    drawerBackdrop.hidden = false;
    cartBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("no-scroll");
    setTimeout(() => $("#cartClose").focus(), 50);
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    drawerBackdrop.hidden = true;
    cartBtn.setAttribute("aria-expanded", "false");
    if (modal.hidden) document.body.classList.remove("no-scroll");
    cartBtn.focus();
  }

  cartBtn.addEventListener("click", openCart);
  $("#cartClose").addEventListener("click", closeCart);
  drawerBackdrop.addEventListener("click", closeCart);
  $("#cartBrowse").addEventListener("click", closeCart);

  /* ---------- Toast ---------- */
  let toastTimer;
  function showToast(text) {
    const t = $("#toast");
    t.textContent = text;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
  }

  /* ---------- Generic WhatsApp links (data-wa="message") ---------- */
  $$("[data-wa]").forEach((el) => {
    el.href = waLink(el.dataset.wa);
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  /* ---------- Navigation ---------- */
  const header = $(".site-header");
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  menuToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  navLinks.addEventListener("click", (e) => {
    if (e.target.closest("a")) {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section in view
  if ("IntersectionObserver" in window) {
    const links = $$(".nav-links a");
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ["products", "about", "reviews", "assessment", "contact"].forEach((id) => {
      const s = document.getElementById(id);
      if (s) sectionObserver.observe(s);
    });

    // Reveal-on-scroll animations
    const revealEls = $$(".section-head, .about-visual, .about-copy, .contact-card, .feature, .cta-inner");
    revealEls.forEach((el) => el.classList.add("reveal"));
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderProducts();
  renderCart();

  /* ---------- Form submission (Web3Forms → emailed to the account owner) ---------- */
  // Resolves on success. Rejects with an Error whose `message` is a friendly,
  // human-readable explanation that can be shown under the form.
  // payload: form answers plus optional `subject` and `replyto`.
  async function sendForm(payload) {
    let res, json;
    try {
      res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: CONFIG.web3formsKey,
          from_name: "Felix Oketch Solar Website",
          ...payload,
        }),
      });
      json = await res.json().catch(() => ({}));
    } catch (networkErr) {
      console.warn("Form network error:", networkErr);
      throw new Error("We couldn't reach the email service. Check your internet connection or pause any ad blocker, then try again.");
    }
    if (res.ok && json.success === true) return json;

    const reason = String(json.message || `HTTP ${res.status}`);
    console.warn("Form rejected:", reason);
    throw new Error(`The form couldn't be sent (${reason}).`);
  }

  // Shared helpers for assessment.js and reviews.js
  window.FelixSite = { CONFIG, waLink, showToast, sendForm, escapeHTML };
})();
