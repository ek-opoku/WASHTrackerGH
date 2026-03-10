export type District = { id: string; name: string; population: number; };
export type Region = { id: string; name: string; population: number; districts: District[]; };
export const geography = [
  {
    "id": "ahafo",
    "name": "Ahafo",
    "population": 168191,
    "districts": [
      {
        "id": "asutifi-north",
        "name": "Asutifi North",
        "population": 173658
      },
      {
        "id": "asutifi-south",
        "name": "Asutifi South",
        "population": 477665
      },
      {
        "id": "tano-north-municipal",
        "name": "Tano North Municipal",
        "population": 367114
      }
    ]
  },
  {
    "id": "ashanti",
    "name": "Ashanti",
    "population": 216941,
    "districts": [
      {
        "id": "kumasi-metropolitan",
        "name": "Kumasi Metropolitan",
        "population": 507336
      },
      {
        "id": "ejisu-juaben-municipal",
        "name": "Juaben Municipal",
        "population": 175008
      },
      {
        "id": "atwima-nwabiagya",
        "name": "Atwima Nwabiagya North",
        "population": 388966
      }
    ]
  },
  {
    "id": "bono",
    "name": "Bono",
    "population": 411199,
    "districts": [
      {
        "id": "sunyani-municipal",
        "name": "Sunyani Municipal",
        "population": 472172
      },
      {
        "id": "wenchi-municipal",
        "name": "Wenchi Municipal",
        "population": 594621
      }
    ]
  },
  {
    "id": "bono-east",
    "name": "Bono East",
    "population": 272125,
    "districts": [
      {
        "id": "techiman-municipal",
        "name": "Techiman Municipal",
        "population": 558209
      },
      {
        "id": "nkoranza-south",
        "name": "Nkoranza South",
        "population": 102397
      }
    ]
  },
  {
    "id": "central",
    "name": "Central",
    "population": 574945,
    "districts": [
      {
        "id": "cape-coast-metropolitan",
        "name": "Cape Coast Metropolitan",
        "population": 300658
      },
      {
        "id": "komenda-edina-eguafo-abrem",
        "name": "Komenda-Edina-Eguafo-Abirem Municipal",
        "population": 148723
      },
      {
        "id": "abura-asebu-kwamankese",
        "name": "Abura-Asebu-Kwamankese",
        "population": 261686
      }
    ]
  },
  {
    "id": "eastern",
    "name": "Eastern",
    "population": 427614,
    "districts": [
      {
        "id": "koforidua-municipal",
        "name": "New Juaben South Municipal",
        "population": 505748
      },
      {
        "id": "new-juaben-municipal",
        "name": "New Juaben North Municipal",
        "population": 358569
      },
      {
        "id": "akwapim-north",
        "name": "Akwapem North",
        "population": 497260
      }
    ]
  },
  {
    "id": "greater-accra",
    "name": "Greater Accra",
    "population": 273732,
    "districts": [
      {
        "id": "accra-metropolitan",
        "name": "Accra Metropolis",
        "population": 431817
      },
      {
        "id": "tema-metropolitan",
        "name": "Tema Metropolitan",
        "population": 464404
      },
      {
        "id": "ga-west-municipal",
        "name": "Ga West Municipal",
        "population": 506143
      }
    ]
  },
  {
    "id": "north-east",
    "name": "North East",
    "population": 522431,
    "districts": [
      {
        "id": "east-mamprusi",
        "name": "East Mamprusi",
        "population": 418545
      },
      {
        "id": "west-mamprusi",
        "name": "West Mamprusi Municipal",
        "population": 561980
      },
      {
        "id": "nalerigu",
        "name": "Bunkpurugu Nakpanduri",
        "population": 192775
      }
    ]
  },
  {
    "id": "northern",
    "name": "Northern",
    "population": 312699,
    "districts": [
      {
        "id": "tamale-metropolitan",
        "name": "Tamale Metropolitan",
        "population": 272448
      },
      {
        "id": "sagnarigu-municipal",
        "name": "Sagnerigu",
        "population": 326247
      },
      {
        "id": "tolon",
        "name": "Tolon",
        "population": 583932
      }
    ]
  },
  {
    "id": "oti",
    "name": "Oti",
    "population": 530582,
    "districts": [
      {
        "id": "jasikan",
        "name": "Jasikan",
        "population": 527278
      },
      {
        "id": "kadjebi",
        "name": "Kadjebi",
        "population": 396976
      },
      {
        "id": "dambai",
        "name": "Krachi East Municipal",
        "population": 594365
      }
    ]
  },
  {
    "id": "savannah",
    "name": "Savannah",
    "population": 295119,
    "districts": [
      {
        "id": "west-gonja",
        "name": "West Gonja",
        "population": 399556
      },
      {
        "id": "east-gonja",
        "name": "East Gonja Municipal",
        "population": 386139
      },
      {
        "id": "damongo",
        "name": "Damongo",
        "population": 597009
      }
    ]
  },
  {
    "id": "upper-east",
    "name": "Upper East",
    "population": 158205,
    "districts": [
      {
        "id": "bolgatanga-municipal",
        "name": "Bolgatanga Municipal",
        "population": 241229
      },
      {
        "id": "bongo",
        "name": "Bongo",
        "population": 440177
      },
      {
        "id": "talensi",
        "name": "Talensi",
        "population": 301439
      }
    ]
  },
  {
    "id": "upper-west",
    "name": "Upper West",
    "population": 209283,
    "districts": [
      {
        "id": "wa-municipal",
        "name": "Wa Municipal",
        "population": 369418
      },
      {
        "id": "nandom",
        "name": "Nandom",
        "population": 588979
      },
      {
        "id": "lawra",
        "name": "Lawra",
        "population": 586486
      }
    ]
  },
  {
    "id": "volta",
    "name": "Volta",
    "population": 182606,
    "districts": [
      {
        "id": "ho-municipal",
        "name": "Ho Municipal",
        "population": 193134
      },
      {
        "id": "ketu-south-municipal",
        "name": "Ketu South Municipal",
        "population": 455641
      },
      {
        "id": "hohoe-municipal",
        "name": "Hohoe Municipal",
        "population": 113114
      }
    ]
  },
  {
    "id": "western",
    "name": "Western",
    "population": 469320,
    "districts": [
      {
        "id": "sekondi-takoradi-metropolitan",
        "name": "Sekondi-Takoradi Metropolitan",
        "population": 291110
      },
      {
        "id": "effia-kwesimintsim-municipal",
        "name": "Effia Kwesimintsim Municipal",
        "population": 291436
      },
      {
        "id": "wassa-amenfi-east",
        "name": "Wassa Amenfi East",
        "population": 420998
      }
    ]
  },
  {
    "id": "western-north",
    "name": "Western North",
    "population": 128111,
    "districts": [
      {
        "id": "sefwi-wiawso-municipal",
        "name": "Sefwi Wiawso Municipal",
        "population": 583736
      },
      {
        "id": "bibiani-anhwiaso-bekwai",
        "name": "Bibiani Anhwiaso Bekwai",
        "population": 397312
      },
      {
        "id": "ajuamanto-enclave",
        "name": "Ajuamanto Enclave",
        "population": 235491
      }
    ]
  }
];