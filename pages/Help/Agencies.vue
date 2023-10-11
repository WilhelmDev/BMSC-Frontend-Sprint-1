<template>
  <div>
    <v-container class="help-agencies mx-auto">
      <h2 class="pb-8 black-text">{{pageTitle}}</h2>
      <v-tabs left show-arrows>
        <v-tab
          v-for="(item, index) in agencies"
          :key="index"
          @change="onTabChange(item.city)"
          >{{ item.city }}</v-tab
        >
        <v-tab-item
          v-for="(item, index) in agencies"
          :key="index"
        >
          <div class="py-6">
            <div class="d-flex px-2 px-sm-0">
              <div class="main-phone pl-3 pr-5 pt-1">
                <span class="icon-phone green-text"></span>
                <span class="strong-regular-text"> {{item.phone}} </span>
              </div>
              <span class="small-text my-auto pl-2"> Central de consultas {{ item.city }} </span>
            </div>
            <AgencyMap
              :data="selectedList"
              v-bind:agenciesAndAtmData="agenciesAndAtmData"
              :buttonConfig="filterConfig"
              :searchItems="searchList"
              :allItems="agenciesAndAtmData"
              :onSearchResultClick="onSearchResultClick"
              :selectedId="exactId"
            />
          </div>
        </v-tab-item>
      </v-tabs>
      <AgencyList v-bind:departmentMap="departmentMap"/>
    </v-container>
    <MoreInfo
      :moreInfoTitle="moreInfoConfig.moreInfoTitle"
      :cardIcon1="moreInfoConfig.cardIcon1"
      :cardLabel1="moreInfoConfig.cardLabel1"
      class="mb-16"
    />
  </div>
</template>
<script>
import MoreInfo from "@/components/MoreInfo.vue";
import AgencyMap from "@/components/AgencyMap.vue";
import AgencyList from "@/components/AgencyList.vue";
import {UPDATE_STATE_ACTION} from "~/constants_actions";
import {AGENCY, ATM} from "~/cardListKeys/help";
import { agencyAtmTimeToChunkString, getCurrentTimeState, getIsOpenCms } from '@/utils/timeUtils';
import moment from 'moment';
import {getHeader} from "~/utils/seo";

export default {
  components: {
    MoreInfo,
    AgencyMap,
    AgencyList
  },
  data() {
    return {
      selectedDepartment: "La Paz",
      exactId: -1,
      showAgencies: true,
      showAtms: true,
      showDriveThrough: true,
      filterConfig: [
        {
          name: 'Agencias',
          filter: 'showAgencies',
          onClick: this.onFilterButtonClick,
          pressed: true
        },
        {
          name: 'Cajeros',
          filter: 'showAtms',
          onClick: this.onFilterButtonClick,
          pressed: true
        },
        {
          name: 'Auto-banco',
          filter: 'showDriveThrough',
          onClick: this.onFilterButtonClick,
          pressed: true
        }
      ],
      selectedList: [],
      searchList: [],
      shouldUpdateIcons: false,
      pageTitle:  "Agencias y Cajeros Automáticos",
      departmentMap: {},
      agencies: [
        {
          city: "La Paz",
          phone: "211-4010",
          agencies: [
            {
              titulo: "Oficina Principal",
              direccion: "Calle Ayacucho esq. Mercado N° 295",
              telefono: "(591-2) 2409040",
              horarioAtencion: "Lun-Vie%08:00%13:00%15:00%18:00,Sab-Dom%08:00%20:00",
              horarios: []
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Cochabamba",
          phone: "411-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Santa Cruz",
          phone: "311-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Oruro",
          phone: "511-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Potosí",
          phone: "612-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Chuquisaca",
          phone: "691-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Beni",
          phone: "462-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Tarija",
          phone: "611-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        },
        {
          city: "Pando",
          phone: "7291-4010",
          agencies: [
            {
              name: "Oficina Principal",
              address: "Calle Ayacucho esq. Mercado N° 295",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Av. Camacho 1448",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Calle Belisario Salinas N. 438",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            },
            {
              name: "Nombre de agencia",
              address: "Diaz Romero 1399",
              mapUrl: "",
              state: "Abierto",
              phone: "(591-2) 2409040",
              hour: "4:00 PM",
              weekSchedule: "09:00 a 13:00 - 15:00 a 18:00",
              weekendSchedule: "09:00 a 13:00"
            }
          ]
        }
      ],
      relatedItems: {
        items: [
          {
            title: "Cuentas BANX para jóvenes",
            subtitle: "Ver opciones",
            route: "/banx"
          },
          {
            title: "Cuentas para negocios PYME",
            subtitle: "Ver opciones",
            route: "/pyme"
          },
          {
            title: "Cuentas corporativas para tu empresa",
            subtitle: "Ver opciones",
            route: "/companies"
          },
          {
            title: "Prestamos para tu casa o vehículo",
            subtitle: "Ver préstamos",
            route: "/client/Loans"
          }
        ]
      },
      agencyList: [
        {
          city: "Santa Cruz",
          agencies: [
            {
              name: "Santa Cruz de la Sierra",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 6
            },
            {
              name: "Santa Cruz de la Sierra",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 12
            }
          ]
        },
        {
          city: "La Paz",
          agencies: [
            {
              name: "La Paz",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 6
            },
            {
              name: "Santa Cruz de la Sierra",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 12
            }
          ]
        },
        {
          city: "Cochabamba",
          agencies: [
            {
              name: "Cochabamba",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 6
            }
          ]
        },
        {
          city: "Chuquisaca",
          agencies: [
            {
              name: "Chuquisaca",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 6
            }
          ]
        },
        {
          city: "Beni",
          agencies: [
            {
              name: "Beni",
              quantity: 50
            },
            {
              name: "Warnes",
              quantity: 12
            },
            {
              name: "Ciudad",
              quantity: 6
            }
          ]
        },
        {
          city: "Potosí",
          agencies: [
            {
              name: "Potosí",
              quantity: 50
            }
          ]
        },
        {
          city: "Oruro",
          agencies: [
            {
              name: "Oruro",
              quantity: 50
            }
          ]
        },
        {
          city: "Tarija",
          agencies: [
            {
              name: "Tarija",
              quantity: 50
            }
          ]
        },
        {
          city: "Pando",
          agencies: [
            {
              name: "Pando",
              quantity: 50
            }
          ]
        }
      ],
      moreInfoConfig: {
        moreInfoTitle: "También podría interesarte",
        cardIcon1: "icon-help",
        cardLabel1: "Preguntas frecuentes",
      }
    };
  },
  async mounted() {
    await this.$store.dispatch(`help/${UPDATE_STATE_ACTION}`,[AGENCY, this]);
    await this.$store.dispatch(`help/${UPDATE_STATE_ACTION}`,[ATM, this]);
  },
  computed: {
    agenciesAndAtmData: function () {
      let agencies = this.$store.getters["help/getList"](AGENCY);
      let atms = this.$store.getters["help/getList"](ATM);
      let departmentMap= {};
      agencies = agencies.map(agency => {
        if(!departmentMap[agency['departamento']]) departmentMap[agency['departamento']] = {};
        if(departmentMap[agency['departamento']][agency['ciudad']]) {
          departmentMap[agency['departamento']][agency['ciudad']]++;
        } else {
          departmentMap[agency['departamento']][agency['ciudad']] = 1;
        }
        const chunkString = agencyAtmTimeToChunkString(agency.horarioAtencion || "");
        let state;
        let isOpenCms = getIsOpenCms(agency.horarioAtencionCms)
        if(!isOpenCms) {
          state = "Cerrado"
        } else {
          state = getCurrentTimeState(chunkString)
        }
        return {
          ...agency,
          type: AGENCY,
          horarios: chunkString,
          state,
          hour: moment().format('HH:mm')
        }
      });
      atms = atms.map(atm => {
        if(!departmentMap[atm['departamento']]) departmentMap[atm['departamento']] = {};
        if(departmentMap[atm['departamento']][atm['ciudad']]) {
          departmentMap[atm['departamento']][atm['ciudad']]++;
        } else {
          departmentMap[atm['departamento']][atm['ciudad']] = 1;
        }
        const chunkString = agencyAtmTimeToChunkString(atm.horarioAtencion || "");
        let state;
        let isOpenCms = getIsOpenCms(atm.horarioAtencionCms)
        if(!isOpenCms) {
          state = "Cerrado"
        } else {
          state = getCurrentTimeState(chunkString)
        }
        return {
          ...atm,
          type: ATM,
          horarios: chunkString,
          state,
          hour: moment().format('HH:mm')
        }
      });
      //console.log('DEPARMENT MAP: ',JSON.parse(JSON.stringify(departmentMap)));
      this.departmentMap = departmentMap;
      let res = [...agencies,...atms];
      //console.log(AGENCY+" "+ATM, res);
      this.searchList = this.getSearchItems(res);
      return res;
    },
    agenciesAndAtmMap: function () {
      let mainList = this.agenciesAndAtmData;
      let map = JSON.parse(JSON.stringify(this.departmentMap));
      for(let i in mainList) {
        map[mainList[i]['departamento']]['items']++;
      }
      // console.log(res)
      //console.log(AGENCY+" "+ATM, res);
      return res;
    }
  },
  methods: {
    accountDetails(data) {
      this.$router.push({
        path: `AccountDetails?accountId=${data.id}`
      });
    },
    accountComparison() {
      this.$router.push({
        path: "AccountComparison"
      });
    },
    onFilterButtonClick(button) {
      this[button.filter] = !this[button.filter];
      button.pressed = !button.pressed;
    },
    onTabChange(department) {
      this.selectedDepartment = department;
    },
    applyFilters() {
      const selected = this.agenciesAndAtmData.filter(item => {
        // first search by id and department
        let isInSearch = false;
        if (this.selectedDepartment.toLowerCase().trim()
              === item.departamento.toLowerCase().trim()) {
          isInSearch = true;
        } else {
          isInSearch = false;
        }
        if (this.exactId !== -1) {
          isInSearch = isInSearch && (this.exactId === item.id);
        }
        // then apply additional filters
        if (this.showAgencies && item.type === AGENCY) return isInSearch;
        if (this.showAtms && item.type === ATM) return isInSearch;
        if (this.showDriveThrough && (item.type === AGENCY) && item.esAutoBanco) return isInSearch;
        return false;
      });
          // console.log(selected)
      return selected;
    },
    getSearchItems(list) {
      const l = list || this.agenciesAndAtmData;
      const departmentPlaces = l.filter(item => {
        if (this.selectedDepartment.toLowerCase().trim()
              === item.departamento.toLowerCase().trim()) return true;
        return false;
      });

      const res = departmentPlaces.map(item => {
        return {
          text: `${item.titulo} - Zona ${item.zona} `,
          id: item.id,
          state: item.state,
          lat: item.latitud,
          lng: item.longitud,
          type: item.type
        }
      });
      return res;
    },
    onSearchResultClick(selectedId) {
      //console.log('new id => ', selectedId);
      this.exactId = selectedId || -1;
    }
  },
  watch: {
    agenciesAndAtmData() {
      this.selectedList = this.applyFilters();
    },
    showAgencies() {
      this.selectedList = this.applyFilters();
      this.searchList = this.getSearchItems(this.selectedList)
    },
    showAtms() {
      this.selectedList = this.applyFilters();
      this.searchList = this.getSearchItems(this.selectedList)
    },
    showDriveThrough() {
      this.selectedList = this.applyFilters();
      this.searchList = this.getSearchItems(this.selectedList)
    },
    selectedDepartment() {
      this.exactId = -1;
      this.selectedList = this.applyFilters();
      this.searchList = this.getSearchItems();
    },
    exactId() {
      this.selectedList = this.applyFilters();
    }
  },
  async asyncData(context) {
    const header = await getHeader(context);
    return header;
  },
  head () {return this.headData}
};
</script>
<style scoped></style>
