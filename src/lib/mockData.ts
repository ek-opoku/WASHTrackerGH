import { RawWashParameters, ComputedIndex, WaterSourceType, SanitationFacilityType, HygieneFacilityType } from './engine';

export interface WaterLadder {
  safely_managed: number;
  basic: number;
  limited: number;
  unimproved: number;
  surface_water: number;
}
export interface WaterData {
  urban: WaterLadder;
  rural: WaterLadder;
}
export interface SanitationLadder {
  safely_managed: number;
  basic: number;
  limited: number;
  unimproved: number;
  open_defecation: number;
}
export interface SanitationData {
  ladder: SanitationLadder;
  odf_status: boolean;
}
export interface HygieneData {
  soap_and_water_access_percentage: number;
  mhm_score: number;
}
export interface GeographyMetrics {
  id: string;
  name: string;
  population: number;

  rawParams: RawWashParameters;
  computed: ComputedIndex;
  
  // Legacy fields mapped exactly from strict engine indices
  compositeIndex: number; 
  water: WaterData;
  sanitation: SanitationData;
  hygiene: HygieneData;
}
export interface District extends GeographyMetrics {}
export interface Region extends GeographyMetrics {
  districts: District[];
}

export type GeographyLevel = "nation" | "region" | "district";

export const regions: Region[] = [
  {
    "id": "ahafo",
    "name": "Ahafo",
    "population": 168191,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.44999999999999,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 32,
        "limited": 12,
        "unimproved": 8,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 18,
        "basic": 28,
        "limited": 22,
        "unimproved": 20,
        "surface_water": 12
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 25,
        "limited": 18,
        "unimproved": 22,
        "open_defecation": 23
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 44
    },
    "districts": [
      {
        "id": "asutifi-north",
        "name": "Asutifi North",
        "population": 173658,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 35,
            "limited": 14,
            "unimproved": 7,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 14,
            "basic": 26,
            "limited": 24,
            "unimproved": 22,
            "surface_water": 14
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 22,
            "limited": 20,
            "unimproved": 24,
            "open_defecation": 24
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 40
        }
      },
      {
        "id": "asutifi-south",
        "name": "Asutifi South",
        "population": 477665,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 36,
            "limited": 15,
            "unimproved": 8,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 12,
            "basic": 28,
            "limited": 26,
            "unimproved": 22,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 24,
            "limited": 22,
            "unimproved": 26,
            "open_defecation": 20
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 38
        }
      },
      {
        "id": "tano-north-municipal",
        "name": "Tano North Municipal",
        "population": 367114,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 30,
            "limited": 12,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 20,
            "basic": 30,
            "limited": 20,
            "unimproved": 18,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 26,
            "limited": 16,
            "unimproved": 22,
            "open_defecation": 22
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 46
        }
      }
    ]
  },
  {
    "id": "ashanti",
    "name": "Ashanti",
    "population": 216941,
    "rawParams": {
      "waterSource": "piped_yard",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 5,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "vip_latrine",
      "sanitationShared": false,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 76.3740667967255,
      "sanitation": 20,
      "hygiene": 0,
      "composite": 48.18703339836275,
      "isCapped": false
    },
    "compositeIndex": 48,
    "water": {
      "urban": {
        "safely_managed": 76,
        "basic": 28,
        "limited": 8,
        "unimproved": 4,
        "surface_water": 2
      },
      "rural": {
        "safely_managed": 28,
        "basic": 35,
        "limited": 20,
        "unimproved": 12,
        "surface_water": 5
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 20,
        "basic": 35,
        "limited": 15,
        "unimproved": 12,
        "open_defecation": 10
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 62
    },
    "districts": [
      {
        "id": "kumasi-metropolitan",
        "name": "Kumasi Metropolitan",
        "population": 507336,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "flush_septic",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 20,
          "hygiene": 0,
          "composite": 27.650000000000002,
          "isCapped": false
        },
        "compositeIndex": 28,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 24,
            "limited": 5,
            "unimproved": 2,
            "surface_water": 1
          },
          "rural": {
            "safely_managed": 35,
            "basic": 38,
            "limited": 16,
            "unimproved": 8,
            "surface_water": 3
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 20,
            "basic": 38,
            "limited": 12,
            "unimproved": 8,
            "open_defecation": 4
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 74
        }
      },
      {
        "id": "ejisu-juaben-municipal",
        "name": "Juaben Municipal",
        "population": 175008,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 10,
            "unimproved": 4,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 24,
            "basic": 36,
            "limited": 22,
            "unimproved": 14,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 36,
            "limited": 18,
            "unimproved": 14,
            "open_defecation": 8
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 58
        }
      },
      {
        "id": "atwima-nwabiagya",
        "name": "Atwima Nwabiagya North",
        "population": 388966,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 12,
            "unimproved": 6,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 22,
            "basic": 34,
            "limited": 24,
            "unimproved": 14,
            "surface_water": 6
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 32,
            "limited": 20,
            "unimproved": 16,
            "open_defecation": 12
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 52
        }
      }
    ]
  },
  {
    "id": "bono",
    "name": "Bono",
    "population": 411199,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.44999999999999,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 30,
        "limited": 12,
        "unimproved": 7,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 22,
        "basic": 32,
        "limited": 22,
        "unimproved": 16,
        "surface_water": 8
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 30,
        "limited": 20,
        "unimproved": 20,
        "open_defecation": 12
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 50
    },
    "districts": [
      {
        "id": "sunyani-municipal",
        "name": "Sunyani Municipal",
        "population": 472172,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 10,
            "unimproved": 5,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 28,
            "basic": 34,
            "limited": 20,
            "unimproved": 12,
            "surface_water": 6
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 34,
            "limited": 18,
            "unimproved": 14,
            "open_defecation": 8
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 60
        }
      },
      {
        "id": "wenchi-municipal",
        "name": "Wenchi Municipal",
        "population": 594621,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 34,
            "limited": 14,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 16,
            "basic": 30,
            "limited": 24,
            "unimproved": 18,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 28,
            "limited": 22,
            "unimproved": 22,
            "open_defecation": 16
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 44
        }
      }
    ]
  },
  {
    "id": "bono-east",
    "name": "Bono East",
    "population": 272125,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.44999999999999,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 32,
        "limited": 14,
        "unimproved": 10,
        "surface_water": 4
      },
      "rural": {
        "safely_managed": 14,
        "basic": 28,
        "limited": 26,
        "unimproved": 20,
        "surface_water": 12
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 24,
        "limited": 22,
        "unimproved": 24,
        "open_defecation": 20
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 40
    },
    "districts": [
      {
        "id": "techiman-municipal",
        "name": "Techiman Municipal",
        "population": 558209,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 30,
            "limited": 12,
            "unimproved": 6,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 20,
            "basic": 32,
            "limited": 24,
            "unimproved": 16,
            "surface_water": 8
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 30,
            "limited": 20,
            "unimproved": 18,
            "open_defecation": 12
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 52
        }
      },
      {
        "id": "nkoranza-south",
        "name": "Nkoranza South",
        "population": 102397,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 34,
            "limited": 16,
            "unimproved": 10,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 12,
            "basic": 26,
            "limited": 28,
            "unimproved": 22,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 22,
            "limited": 24,
            "unimproved": 26,
            "open_defecation": 20
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 36
        }
      }
    ]
  },
  {
    "id": "central",
    "name": "Central",
    "population": 574945,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 62.95000000000001,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 62.95000000000001,
      "isCapped": false
    },
    "compositeIndex": 63,
    "water": {
      "urban": {
        "safely_managed": 63,
        "basic": 30,
        "limited": 10,
        "unimproved": 5,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 24,
        "basic": 34,
        "limited": 22,
        "unimproved": 14,
        "surface_water": 6
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 34,
        "limited": 18,
        "unimproved": 16,
        "open_defecation": 10
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 56
    },
    "districts": [
      {
        "id": "cape-coast-metropolitan",
        "name": "Cape Coast Metropolitan",
        "population": 300658,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": null,
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 31.475,
          "isCapped": false
        },
        "compositeIndex": 31,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 26,
            "limited": 7,
            "unimproved": 3,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 30,
            "basic": 36,
            "limited": 20,
            "unimproved": 10,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 38,
            "limited": 14,
            "unimproved": 10,
            "open_defecation": 6
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 70
        }
      },
      {
        "id": "komenda-edina-eguafo-abrem",
        "name": "Komenda-Edina-Eguafo-Abirem Municipal",
        "population": 148723,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": null,
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 31.475,
          "isCapped": false
        },
        "compositeIndex": 31,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 32,
            "limited": 12,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 20,
            "basic": 32,
            "limited": 24,
            "unimproved": 16,
            "surface_water": 8
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 30,
            "limited": 20,
            "unimproved": 20,
            "open_defecation": 12
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 50
        }
      },
      {
        "id": "abura-asebu-kwamankese",
        "name": "Abura-Asebu-Kwamankese",
        "population": 261686,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": null,
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 31.475,
          "isCapped": false
        },
        "compositeIndex": 31,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 33,
            "limited": 13,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 18,
            "basic": 32,
            "limited": 26,
            "unimproved": 16,
            "surface_water": 8
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 32,
            "limited": 20,
            "unimproved": 20,
            "open_defecation": 12
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 48
        }
      }
    ]
  },
  {
    "id": "eastern",
    "name": "Eastern",
    "population": 427614,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 79.13717376982719,
      "sanitation": 12.5,
      "hygiene": 0,
      "composite": 45.81858688491359,
      "isCapped": false
    },
    "compositeIndex": 46,
    "water": {
      "urban": {
        "safely_managed": 79,
        "basic": 30,
        "limited": 11,
        "unimproved": 6,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 22,
        "basic": 34,
        "limited": 24,
        "unimproved": 14,
        "surface_water": 6
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 13,
        "basic": 32,
        "limited": 20,
        "unimproved": 18,
        "open_defecation": 10
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 54
    },
    "districts": [
      {
        "id": "koforidua-municipal",
        "name": "New Juaben South Municipal",
        "population": 505748,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 8,
            "unimproved": 4,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 28,
            "basic": 34,
            "limited": 22,
            "unimproved": 12,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 34,
            "limited": 16,
            "unimproved": 14,
            "open_defecation": 8
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 62
        }
      },
      {
        "id": "new-juaben-municipal",
        "name": "New Juaben North Municipal",
        "population": 358569,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 9,
            "unimproved": 5,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 26,
            "basic": 34,
            "limited": 22,
            "unimproved": 12,
            "surface_water": 6
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 35,
            "limited": 17,
            "unimproved": 14,
            "open_defecation": 8
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 60
        }
      },
      {
        "id": "akwapim-north",
        "name": "Akwapem North",
        "population": 497260,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "pit_no_slab",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 12.5,
          "hygiene": 0,
          "composite": 25.150000000000002,
          "isCapped": false
        },
        "compositeIndex": 25,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 34,
            "limited": 14,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 16,
            "basic": 32,
            "limited": 26,
            "unimproved": 16,
            "surface_water": 10
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 13,
            "basic": 28,
            "limited": 22,
            "unimproved": 22,
            "open_defecation": 14
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 46
        }
      }
    ]
  },
  {
    "id": "greater-accra",
    "name": "Greater Accra",
    "population": 273732,
    "rawParams": {
      "waterSource": "piped_yard",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 24,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 5,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "vip_latrine",
      "sanitationShared": false,
      "fsmChain": "safely_managed",
      "hygieneFacility": "fixed_sink",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 72.1534924598749,
      "sanitation": 45,
      "hygiene": 0,
      "composite": 58.57674622993745,
      "isCapped": false
    },
    "compositeIndex": 59,
    "water": {
      "urban": {
        "safely_managed": 72,
        "basic": 20,
        "limited": 5,
        "unimproved": 2,
        "surface_water": 1
      },
      "rural": {
        "safely_managed": 45,
        "basic": 35,
        "limited": 12,
        "unimproved": 6,
        "surface_water": 2
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 45,
        "basic": 32,
        "limited": 10,
        "unimproved": 6,
        "open_defecation": 4
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 76
    },
    "districts": [
      {
        "id": "accra-metropolitan",
        "name": "Accra Metropolis",
        "population": 431817,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "flush_septic",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 45,
          "hygiene": 0,
          "composite": 35.983333333333334,
          "isCapped": false
        },
        "compositeIndex": 36,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 16,
            "limited": 4,
            "unimproved": 1,
            "surface_water": 1
          },
          "rural": {
            "safely_managed": 52,
            "basic": 32,
            "limited": 10,
            "unimproved": 4,
            "surface_water": 2
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 45,
            "basic": 30,
            "limited": 8,
            "unimproved": 4,
            "open_defecation": 3
          },
          "odf_status": true
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 84
        }
      },
      {
        "id": "tema-metropolitan",
        "name": "Tema Metropolitan",
        "population": 464404,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "flush_septic",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 45,
          "hygiene": 0,
          "composite": 35.983333333333334,
          "isCapped": false
        },
        "compositeIndex": 36,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 18,
            "limited": 4,
            "unimproved": 1,
            "surface_water": 1
          },
          "rural": {
            "safely_managed": 48,
            "basic": 34,
            "limited": 12,
            "unimproved": 4,
            "surface_water": 2
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 45,
            "basic": 32,
            "limited": 8,
            "unimproved": 5,
            "open_defecation": 3
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 80
        }
      },
      {
        "id": "ga-west-municipal",
        "name": "Ga West Municipal",
        "population": 506143,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 24,
            "limited": 8,
            "unimproved": 4,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 38,
            "basic": 34,
            "limited": 16,
            "unimproved": 8,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 34,
            "limited": 14,
            "unimproved": 10,
            "open_defecation": 4
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 68
        }
      }
    ]
  },
  {
    "id": "north-east",
    "name": "North East",
    "population": 522431,
    "rawParams": {
      "waterSource": "unprotected_well",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 150,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "open_defecation",
      "sanitationShared": true,
      "fsmChain": "dumped",
      "hygieneFacility": "none",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.44999999999999,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 34,
        "limited": 16,
        "unimproved": 12,
        "surface_water": 6
      },
      "rural": {
        "safely_managed": 8,
        "basic": 22,
        "limited": 28,
        "unimproved": 24,
        "surface_water": 18
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 16,
        "limited": 24,
        "unimproved": 28,
        "open_defecation": 28
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 28
    },
    "districts": [
      {
        "id": "east-mamprusi",
        "name": "East Mamprusi",
        "population": 418545,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 36,
            "limited": 18,
            "unimproved": 12,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 6,
            "basic": 20,
            "limited": 30,
            "unimproved": 26,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 14,
            "limited": 26,
            "unimproved": 30,
            "open_defecation": 28
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 24
        }
      },
      {
        "id": "west-mamprusi",
        "name": "West Mamprusi Municipal",
        "population": 561980,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 33,
            "limited": 15,
            "unimproved": 11,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 10,
            "basic": 24,
            "limited": 26,
            "unimproved": 22,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 18,
            "limited": 22,
            "unimproved": 26,
            "open_defecation": 28
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 30
        }
      },
      {
        "id": "nalerigu",
        "name": "Bunkpurugu Nakpanduri",
        "population": 192775,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 14,
            "unimproved": 10,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 12,
            "basic": 24,
            "limited": 26,
            "unimproved": 22,
            "surface_water": 16
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 20,
            "limited": 22,
            "unimproved": 26,
            "open_defecation": 24
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 32
        }
      }
    ]
  },
  {
    "id": "northern",
    "name": "Northern",
    "population": 312699,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 64.52740614750044,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 64.52740614750044,
      "isCapped": false
    },
    "compositeIndex": 65,
    "water": {
      "urban": {
        "safely_managed": 65,
        "basic": 32,
        "limited": 14,
        "unimproved": 10,
        "surface_water": 6
      },
      "rural": {
        "safely_managed": 10,
        "basic": 24,
        "limited": 28,
        "unimproved": 22,
        "surface_water": 16
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 20,
        "limited": 24,
        "unimproved": 26,
        "open_defecation": 22
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 36
    },
    "districts": [
      {
        "id": "tamale-metropolitan",
        "name": "Tamale Metropolitan",
        "population": 272448,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 12,
            "unimproved": 6,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 22,
            "basic": 30,
            "limited": 24,
            "unimproved": 16,
            "surface_water": 8
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 30,
            "limited": 20,
            "unimproved": 18,
            "open_defecation": 10
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 56
        }
      },
      {
        "id": "sagnarigu-municipal",
        "name": "Sagnerigu",
        "population": 326247,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 14,
            "unimproved": 8,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 14,
            "basic": 26,
            "limited": 28,
            "unimproved": 20,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 26,
            "limited": 22,
            "unimproved": 22,
            "open_defecation": 16
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 44
        }
      },
      {
        "id": "tolon",
        "name": "Tolon",
        "population": 583932,
        "rawParams": {
          "waterSource": "surface_water",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 45,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 40,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 13.333333333333334,
          "isCapped": false
        },
        "compositeIndex": 13,
        "water": {
          "urban": {
            "safely_managed": 40,
            "basic": 34,
            "limited": 18,
            "unimproved": 12,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 6,
            "basic": 22,
            "limited": 30,
            "unimproved": 24,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 16,
            "limited": 26,
            "unimproved": 28,
            "open_defecation": 26
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 28
        }
      }
    ]
  },
  {
    "id": "oti",
    "name": "Oti",
    "population": 530582,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.44999999999999,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 34,
        "limited": 14,
        "unimproved": 9,
        "surface_water": 5
      },
      "rural": {
        "safely_managed": 12,
        "basic": 26,
        "limited": 28,
        "unimproved": 22,
        "surface_water": 12
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 22,
        "limited": 24,
        "unimproved": 24,
        "open_defecation": 20
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 40
    },
    "districts": [
      {
        "id": "jasikan",
        "name": "Jasikan",
        "population": 527278,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 33,
            "limited": 14,
            "unimproved": 9,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 14,
            "basic": 28,
            "limited": 26,
            "unimproved": 20,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 24,
            "limited": 22,
            "unimproved": 22,
            "open_defecation": 20
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 42
        }
      },
      {
        "id": "kadjebi",
        "name": "Kadjebi",
        "population": 396976,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 34,
            "limited": 16,
            "unimproved": 10,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 10,
            "basic": 24,
            "limited": 30,
            "unimproved": 24,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 22,
            "limited": 24,
            "unimproved": 26,
            "open_defecation": 20
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 38
        }
      },
      {
        "id": "dambai",
        "name": "Krachi East Municipal",
        "population": 594365,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 14,
            "unimproved": 8,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 16,
            "basic": 28,
            "limited": 26,
            "unimproved": 18,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 26,
            "limited": 22,
            "unimproved": 20,
            "open_defecation": 18
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 44
        }
      }
    ]
  },
  {
    "id": "savannah",
    "name": "Savannah",
    "population": 295119,
    "rawParams": {
      "waterSource": "unprotected_well",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 150,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "open_defecation",
      "sanitationShared": true,
      "fsmChain": "dumped",
      "hygieneFacility": "none",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 74.9196749629711,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 74.9196749629711,
      "isCapped": false
    },
    "compositeIndex": 75,
    "water": {
      "urban": {
        "safely_managed": 75,
        "basic": 34,
        "limited": 18,
        "unimproved": 12,
        "surface_water": 6
      },
      "rural": {
        "safely_managed": 6,
        "basic": 20,
        "limited": 30,
        "unimproved": 26,
        "surface_water": 18
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 14,
        "limited": 26,
        "unimproved": 28,
        "open_defecation": 28
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 26
    },
    "districts": [
      {
        "id": "west-gonja",
        "name": "West Gonja",
        "population": 399556,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 35,
            "limited": 18,
            "unimproved": 12,
            "surface_water": 7
          },
          "rural": {
            "safely_managed": 4,
            "basic": 18,
            "limited": 32,
            "unimproved": 28,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 12,
            "limited": 28,
            "unimproved": 30,
            "open_defecation": 28
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 24
        }
      },
      {
        "id": "east-gonja",
        "name": "East Gonja Municipal",
        "population": 386139,
        "rawParams": {
          "waterSource": "surface_water",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 45,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 40,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 13.333333333333334,
          "isCapped": false
        },
        "compositeIndex": 13,
        "water": {
          "urban": {
            "safely_managed": 40,
            "basic": 33,
            "limited": 17,
            "unimproved": 12,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 8,
            "basic": 22,
            "limited": 28,
            "unimproved": 24,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 16,
            "limited": 24,
            "unimproved": 28,
            "open_defecation": 26
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 28
        }
      },
      {
        "id": "damongo",
        "name": "Damongo",
        "population": 597009,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 16,
            "unimproved": 11,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 10,
            "basic": 22,
            "limited": 28,
            "unimproved": 24,
            "surface_water": 16
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 18,
            "limited": 22,
            "unimproved": 26,
            "open_defecation": 26
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 30
        }
      }
    ]
  },
  {
    "id": "upper-east",
    "name": "Upper East",
    "population": 158205,
    "rawParams": {
      "waterSource": "unprotected_well",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 150,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "open_defecation",
      "sanitationShared": true,
      "fsmChain": "dumped",
      "hygieneFacility": "none",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.45,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.45,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 34,
        "limited": 16,
        "unimproved": 10,
        "surface_water": 6
      },
      "rural": {
        "safely_managed": 8,
        "basic": 22,
        "limited": 28,
        "unimproved": 24,
        "surface_water": 18
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 18,
        "limited": 24,
        "unimproved": 28,
        "open_defecation": 24
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 34
    },
    "districts": [
      {
        "id": "bolgatanga-municipal",
        "name": "Bolgatanga Municipal",
        "population": 241229,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 30,
            "limited": 14,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 18,
            "basic": 26,
            "limited": 26,
            "unimproved": 20,
            "surface_water": 10
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 28,
            "limited": 20,
            "unimproved": 22,
            "open_defecation": 12
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 50
        }
      },
      {
        "id": "bongo",
        "name": "Bongo",
        "population": 440177,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 36,
            "limited": 18,
            "unimproved": 12,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 4,
            "basic": 18,
            "limited": 32,
            "unimproved": 28,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 14,
            "limited": 26,
            "unimproved": 30,
            "open_defecation": 28
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 26
        }
      },
      {
        "id": "talensi",
        "name": "Talensi",
        "population": 301439,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 34,
            "limited": 17,
            "unimproved": 11,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 6,
            "basic": 20,
            "limited": 30,
            "unimproved": 26,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 16,
            "limited": 26,
            "unimproved": 28,
            "open_defecation": 26
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 30
        }
      }
    ]
  },
  {
    "id": "upper-west",
    "name": "Upper West",
    "population": 209283,
    "rawParams": {
      "waterSource": "unprotected_well",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 150,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "open_defecation",
      "sanitationShared": true,
      "fsmChain": "dumped",
      "hygieneFacility": "none",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.45,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.45,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 34,
        "limited": 18,
        "unimproved": 12,
        "surface_water": 6
      },
      "rural": {
        "safely_managed": 6,
        "basic": 20,
        "limited": 30,
        "unimproved": 26,
        "surface_water": 18
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 16,
        "limited": 26,
        "unimproved": 28,
        "open_defecation": 26
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 28
    },
    "districts": [
      {
        "id": "wa-municipal",
        "name": "Wa Municipal",
        "population": 369418,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 30,
            "limited": 14,
            "unimproved": 9,
            "surface_water": 5
          },
          "rural": {
            "safely_managed": 14,
            "basic": 24,
            "limited": 28,
            "unimproved": 22,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 26,
            "limited": 22,
            "unimproved": 22,
            "open_defecation": 16
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 44
        }
      },
      {
        "id": "nandom",
        "name": "Nandom",
        "population": 588979,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 16,
            "unimproved": 10,
            "surface_water": 6
          },
          "rural": {
            "safely_managed": 10,
            "basic": 22,
            "limited": 28,
            "unimproved": 24,
            "surface_water": 16
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 22,
            "limited": 24,
            "unimproved": 26,
            "open_defecation": 18
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 38
        }
      },
      {
        "id": "lawra",
        "name": "Lawra",
        "population": 586486,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": false,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 35,
            "limited": 20,
            "unimproved": 12,
            "surface_water": 7
          },
          "rural": {
            "safely_managed": 4,
            "basic": 18,
            "limited": 32,
            "unimproved": 28,
            "surface_water": 18
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 14,
            "limited": 28,
            "unimproved": 30,
            "open_defecation": 26
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 24
        }
      }
    ]
  },
  {
    "id": "volta",
    "name": "Volta",
    "population": 182606,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 88.45,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 88.45,
      "isCapped": false
    },
    "compositeIndex": 88,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 30,
        "limited": 12,
        "unimproved": 7,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 20,
        "basic": 30,
        "limited": 24,
        "unimproved": 18,
        "surface_water": 8
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 28,
        "limited": 20,
        "unimproved": 22,
        "open_defecation": 12
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 52
    },
    "districts": [
      {
        "id": "ho-municipal",
        "name": "Ho Municipal",
        "population": 193134,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 10,
            "unimproved": 4,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 26,
            "basic": 32,
            "limited": 22,
            "unimproved": 14,
            "surface_water": 6
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 32,
            "limited": 18,
            "unimproved": 16,
            "open_defecation": 8
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 60
        }
      },
      {
        "id": "ketu-south-municipal",
        "name": "Ketu South Municipal",
        "population": 455641,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 32,
            "limited": 12,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 18,
            "basic": 30,
            "limited": 26,
            "unimproved": 18,
            "surface_water": 8
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 30,
            "limited": 20,
            "unimproved": 18,
            "open_defecation": 10
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 54
        }
      },
      {
        "id": "hohoe-municipal",
        "name": "Hohoe Municipal",
        "population": 113114,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 28,
            "limited": 11,
            "unimproved": 6,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 22,
            "basic": 32,
            "limited": 24,
            "unimproved": 16,
            "surface_water": 6
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 30,
            "limited": 18,
            "unimproved": 18,
            "open_defecation": 10
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 56
        }
      }
    ]
  },
  {
    "id": "western",
    "name": "Western",
    "population": 469320,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 15,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": true,
      "mhmPrivacy": true,
      "mhmMaterials": true,
      "mhmNoExclusion": true
    },
    "computed": {
      "water": 70.35537335682342,
      "sanitation": 0,
      "hygiene": 0,
      "composite": 70.35537335682342,
      "isCapped": false
    },
    "compositeIndex": 70,
    "water": {
      "urban": {
        "safely_managed": 70,
        "basic": 30,
        "limited": 11,
        "unimproved": 6,
        "surface_water": 3
      },
      "rural": {
        "safely_managed": 22,
        "basic": 32,
        "limited": 24,
        "unimproved": 14,
        "surface_water": 8
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 0,
        "basic": 30,
        "limited": 20,
        "unimproved": 20,
        "open_defecation": 10
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 54
    },
    "districts": [
      {
        "id": "sekondi-takoradi-metropolitan",
        "name": "Sekondi-Takoradi Metropolitan",
        "population": 291110,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": null,
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 31.475,
          "isCapped": false
        },
        "compositeIndex": 31,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 24,
            "limited": 7,
            "unimproved": 3,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 32,
            "basic": 34,
            "limited": 20,
            "unimproved": 10,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 34,
            "limited": 14,
            "unimproved": 12,
            "open_defecation": 6
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 72
        }
      },
      {
        "id": "effia-kwesimintsim-municipal",
        "name": "Effia Kwesimintsim Municipal",
        "population": 291436,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 26,
            "limited": 8,
            "unimproved": 4,
            "surface_water": 2
          },
          "rural": {
            "safely_managed": 28,
            "basic": 34,
            "limited": 22,
            "unimproved": 12,
            "surface_water": 4
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 35,
            "limited": 16,
            "unimproved": 12,
            "open_defecation": 7
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 68
        }
      },
      {
        "id": "wassa-amenfi-east",
        "name": "Wassa Amenfi East",
        "population": 420998,
        "rawParams": {
          "waterSource": "sachet_bottled",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": null,
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 62.95,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 31.475,
          "isCapped": false
        },
        "compositeIndex": 31,
        "water": {
          "urban": {
            "safely_managed": 63,
            "basic": 34,
            "limited": 14,
            "unimproved": 9,
            "surface_water": 5
          },
          "rural": {
            "safely_managed": 12,
            "basic": 28,
            "limited": 28,
            "unimproved": 20,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 24,
            "limited": 24,
            "unimproved": 24,
            "open_defecation": 18
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 42
        }
      }
    ]
  },
  {
    "id": "western-north",
    "name": "Western North",
    "population": 128111,
    "rawParams": {
      "waterSource": "public_tap",
      "secondaryWaterSource": null,
      "collectionTimeMinutes": 45,
      "waterAvailableHours": 12,
      "waterAvailabilityYesNo": true,
      "ecoliCount": 50,
      "hasPriorityChemicalContamination": false,
      "sanitationFacility": "pit_no_slab",
      "sanitationShared": true,
      "fsmChain": "contained",
      "hygieneFacility": "mobile_device",
      "hasSoapAndWater": false,
      "mhmPrivacy": false,
      "mhmMaterials": false,
      "mhmNoExclusion": false
    },
    "computed": {
      "water": 88.44999999999999,
      "sanitation": 12.5,
      "hygiene": 0,
      "composite": 50.474999999999994,
      "isCapped": false
    },
    "compositeIndex": 50,
    "water": {
      "urban": {
        "safely_managed": 88,
        "basic": 32,
        "limited": 14,
        "unimproved": 8,
        "surface_water": 4
      },
      "rural": {
        "safely_managed": 16,
        "basic": 28,
        "limited": 26,
        "unimproved": 18,
        "surface_water": 12
      }
    },
    "sanitation": {
      "ladder": {
        "safely_managed": 13,
        "basic": 26,
        "limited": 22,
        "unimproved": 24,
        "open_defecation": 16
      },
      "odf_status": false
    },
    "hygiene": {
      "soap_and_water_access_percentage": 0,
      "mhm_score": 46
    },
    "districts": [
      {
        "id": "sefwi-wiawso-municipal",
        "name": "Sefwi Wiawso Municipal",
        "population": 583736,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "open_defecation",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 0,
          "hygiene": 0,
          "composite": 29.48333333333333,
          "isCapped": false
        },
        "compositeIndex": 29,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 30,
            "limited": 14,
            "unimproved": 7,
            "surface_water": 3
          },
          "rural": {
            "safely_managed": 18,
            "basic": 30,
            "limited": 24,
            "unimproved": 18,
            "surface_water": 10
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 0,
            "basic": 28,
            "limited": 20,
            "unimproved": 22,
            "open_defecation": 14
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 50
        }
      },
      {
        "id": "bibiani-anhwiaso-bekwai",
        "name": "Bibiani Anhwiaso Bekwai",
        "population": 397312,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "pit_no_slab",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 12.5,
          "hygiene": 0,
          "composite": 33.65,
          "isCapped": false
        },
        "compositeIndex": 34,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 31,
            "limited": 13,
            "unimproved": 8,
            "surface_water": 4
          },
          "rural": {
            "safely_managed": 16,
            "basic": 28,
            "limited": 26,
            "unimproved": 20,
            "surface_water": 10
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 13,
            "basic": 26,
            "limited": 22,
            "unimproved": 24,
            "open_defecation": 14
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 48
        }
      },
      {
        "id": "ajuamanto-enclave",
        "name": "Ajuamanto Enclave",
        "population": 235491,
        "rawParams": {
          "waterSource": "borehole_premises",
          "secondaryWaterSource": null,
          "collectionTimeMinutes": 15,
          "waterAvailableHours": null,
          "waterAvailabilityYesNo": null,
          "ecoliCount": null,
          "hasPriorityChemicalContamination": false,
          "sanitationFacility": "pit_no_slab",
          "sanitationShared": true,
          "fsmChain": "dumped",
          "hygieneFacility": "none",
          "hasSoapAndWater": null,
          "mhmPrivacy": null,
          "mhmMaterials": null,
          "mhmNoExclusion": null
        },
        "computed": {
          "water": 88.44999999999999,
          "sanitation": 12.5,
          "hygiene": 0,
          "composite": 33.65,
          "isCapped": false
        },
        "compositeIndex": 34,
        "water": {
          "urban": {
            "safely_managed": 88,
            "basic": 33,
            "limited": 15,
            "unimproved": 9,
            "surface_water": 5
          },
          "rural": {
            "safely_managed": 12,
            "basic": 26,
            "limited": 28,
            "unimproved": 22,
            "surface_water": 12
          }
        },
        "sanitation": {
          "ladder": {
            "safely_managed": 13,
            "basic": 24,
            "limited": 24,
            "unimproved": 26,
            "open_defecation": 16
          },
          "odf_status": false
        },
        "hygiene": {
          "soap_and_water_access_percentage": 0,
          "mhm_score": 42
        }
      }
    ]
  }
];
