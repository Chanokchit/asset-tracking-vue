<template>
  <div>
    <v-dialog
      v-model="this.$store.getters.stateDialogFarm"
      persistent
      :overlay="false"
      max-width="1200px"
      transition="dialog-transition"
    >
      <v-card style="border-radius:10px 10px 0px 0px" min-width="300px">
        <v-toolbar
          style="background-color:#1EC384;border-radius:10px 10px 0px 0px ;color:#FFFFFF"
          class="pa-0"
          ><h2 style="color:#FFFFFF">{{ statusEvent }}</h2>
          <v-spacer></v-spacer>
        </v-toolbar>
        <br />
        <div class="ma-5">
          <a-form-model
            ref="myFarmForm"
            :rules="rules"
            :model="form1"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-form-model-item label="ชื่อฟาร์ม" prop="farm_name">
              <a-input v-model="form1.farm_name" />
            </a-form-model-item>

            <!-- <a-form-model-item label="ชื่อ-นามสกุล เจ้าของฟาร์ม" prop="farm_owner">
              <a-input v-model="form1.farm_owner" />
            </a-form-model-item> -->
            <!-- <a-form-model-item label="เลขบัตรประชาชน" prop="farm_idcard">
              <a-input v-model="form1.farm_idcard" />
            </a-form-model-item> -->

            <a-form-model-item label="เลขที่ทะเบียนฟาร์ม">
              <a-input v-model="form1.farm_number" />
            </a-form-model-item>
            <a-form-model-item
              label="มาตรฐานฟาร์ม"
              class="components-input-demo-size"
              layout="inline"
            >
              <a-checkbox-group
                @change="checkboxStandard"
                v-model="form1.farm_standard"
              >
                <a-checkbox value="CoC" name="standard">
                  CoC
                </a-checkbox>
                <a-checkbox value="GAP" name="standard">
                  GAP
                </a-checkbox>
                <a-checkbox value="new GAP" name="standard">
                  new GAP </a-checkbox
                ><br />
                <a-checkbox value="BAP" name="standard">
                  BAP
                </a-checkbox>
                <a-checkbox value="other" name="standard">
                  อื่นๆ
                </a-checkbox>
              </a-checkbox-group>
            </a-form-model-item>
            <a-form-model-item label="อื่นๆ">
              <a-input
                :disabled="enableds"
                v-model="form1.farm_standard_other"
              />
            </a-form-model-item>
            <a-form-model-item label="ที่อยู่" >
              <a-input v-model="form1.farm_address" />
            </a-form-model-item>
            <a-form-model-item label="ที่อยู่">
              <a-row>
                <a-col :xs="24" :lg="12" :xl="8">
                  <span class="mr-5 AD">จังหวัด:</span>
                  <!-- {{form1.farm_province}} -->
                  <a-select
                    v-model="form1.farm_province"
                    style="width: 130px"
                    :default-value="form1.farm_province"
                    @change="change_province(form1.farm_province)"
                  >
                    <a-select-option
                      v-for="(province, index) in provinceData"
                      :key="index"
                      :value="province.name_th"
                    >
                      {{ province.name_th }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :xs="24" :lg="12" :xl="8">
                  <span class="mr-5 AD">อำเภอ:</span>
                  <!-- {{form1.farm_district}} -->
                  <a-select
                    v-model="form1.farm_district"
                    :default-value="form1.farm_district"
                    @change="change_district(form1.farm_district)"
                    style="width: 130px"
                  >
                    <a-select-option
                      v-for="(district, index) in districtData"
                      :key="index"
                      :value="district.name_th"
                    >
                      {{ district.name_th }}
                    </a-select-option>
                  </a-select>
                </a-col>
                <a-col :xs="24" :lg="12" :xl="8">
                  <span class="mr-5 AD">ตำบล:</span>
                  <a-select
                    v-model="form1.farm_subdistrict"
                    :default-value="form1.farm_subdistrict"
                    style="width: 130px"
                  >
                    <a-select-option
                      v-for="(subdistrict, index) in subdistrictData"
                      :key="index"
                      :value="subdistrict.name_th"
                    >
                      {{ subdistrict.name_th }}
                    </a-select-option>
                  </a-select>
                </a-col>
              </a-row>
            </a-form-model-item>
          </a-form-model>
        </div>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn class="pa-2" outlined color="error" @click="resetForm()"
            >ยกเลิก</v-btn
          > -->
          <v-btn
            v-if="status === 'add'"
            class="pa-2"
            outlined
            color="success"
            @click="handleSubmit()"
            >เพิ่ม</v-btn
          >
          <v-btn
            v-else
            class="pa-2"
            outlined
            color="success"
            @click="ValidateEditFarm()"
            >บันทึก</v-btn
          >
          <v-btn class="pa-2" outlined color="error" @click="resetForm()"
            >ยกเลิก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    dataEdit: {
      type: Object
    },
    status: {
      type: String,
      default: 'ok'
    }
  },
  data () {
    return {
      statusEvent: '',
      labelCol: {
        type: 'flex',
        justify: 'center',
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 14 }
      },
      rules: {
        farm_name: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_owner: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_idcard: [
          {
            required: true,
            message: 'กรุณากรอกเลขบัตรประจำตัวประชาชนให้ครบ 13 หลัก',
            min: 13,
            max: 13
          }
        ],
        farm_number: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_address: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_standard: [{ required: true, message: 'โปรดระบุมาตรฐานฟาร์ม' }],
        farm_standard_other: ['other']
      },
      provinceData: [],
      districtData: [],
      subdistrictData: [],
      enableds: true,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      number: '',
      form1: {
        farm_name: '', // ชื่อฟาร์ม
        // farm_owner: '', // ชื่อขนามสกุลเจ้าของฟาร์ม
        // farm_idcard: '', // เลขบัตรประชาชน
        farm_number: '', // เลขที่ทะเบียนฟาร์ม
        farm_standard: [], // มาตราฐานฟาร์ม
        farm_standard_other: '', // มาตราฐานฟาร์มอื่นๆ
        farm_address: '', // ทีอยู่
        farm_province: '', // จังหวัด
        farm_district: '', // อำเภอ
        farm_subdistrict: '' // ตำบล
      }
    }
  },
  created () {
    if (this.status === 'add') {
      this.statusEvent = 'เพิ่มฟาร์ม'
      // this.get_province()
    }
  },
  watch: {
    async dataEdit (n, o) {
      // await this.get_province()
      // await this.get_district(this.form1.farm_province)
      // this.form1.farm_province = this.provinceData[0].name_th
      if (this.status === 'add') {
        this.statusEvent = 'เพิ่มฟาร์ม'
        this.form1 = n
        await this.get_province()
        this.form1.farm_province = this.provinceData[0].name_th
        await this.get_district(this.form1.farm_province)
        this.form1.farm_district = this.districtData[0].name_th
        await this.get_subdistrict(this.form1.farm_district)
        this.form1.farm_subdistrict = this.subdistrictData[0].name_th
        // console.log('---->add', this.form1)
      } else {
        this.statusEvent = 'แก้ไขฟาร์ม'
        this.form1 = n
        await this.get_province()
        await this.get_district(this.form1.farm_province)
        await this.get_subdistrict(this.form1.farm_district)
        this.checkboxStandard()
      }
    }
  },
  methods: {
    resetRule () {
      this.enableds = true
      this.rules = {
        farm_name: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_owner: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_idcard: [
          {
            required: true,
            message: 'กรุณากรอกเลขบัตรประจำตัวประชาชนให้ครบ 13 หลัก',
            min: 13,
            max: 13
          }
        ],
        farm_number: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_address: [{ required: true, message: 'จำเป็นต้องใส่ข้อมูล' }],
        farm_standard: [{ required: true, message: 'โปรดระบุมาตรฐานฟาร์ม' }],
        farm_standard_other: ['other']
      }
    },
    async get_province () {
      // console.log('get_province1')
      const config = {
        method: 'get',
        // url: process.env.VUE_APP_API + '/api/v1/province',
        url: 'https://unicorn.manageai.co.th/autoprovince/api/v1/province'
      }
      return this.axios(config).then(res => {
        this.provinceData = res.data.data
      })
    },
    get_district (nameth) {
      const config = {
        method: 'get',
        // url: process.env.VUE_APP_API + '/api/v1/province',
        url: 'https://unicorn.manageai.co.th/autoprovince/api/v1/districts',
        params: {
          name_th: nameth
        }
      }
      return this.axios(config).then(res => {
        // console.log('res.districtData', res.data.data)
        this.districtData = res.data.data
      })
    },
    get_subdistrict (nameth) {
      const config = {
        method: 'get',
        // url: process.env.VUE_APP_API + '/api/v1/province',
        url: 'https://unicorn.manageai.co.th/autoprovince/api/v1/subdistricts',
        params: {
          name_th: nameth
        }
      }
      return this.axios(config).then(res => {
        // console.log('res.get_subdistrict', res.data.data)
        this.subdistrictData = res.data.data
      })
    },
    async change_province (nameth) {
      await this.get_district(nameth)
      this.form1.farm_district = this.districtData[0].name_th
      await this.get_subdistrict(this.form1.farm_district)
      this.form1.farm_subdistrict = this.subdistrictData[0].name_th
    },
    async change_district (nameth) {
      await this.get_subdistrict(nameth)
      this.form1.farm_subdistrict = this.subdistrictData[0].name_th
    },
    checkboxStandard () {
      if (this.form1.farm_standard.includes('other') === true) {
        this.rules.farm_standard_other = [
          'other',
          { required: true, message: 'จำเป็นต้องใส่ข้อมูล' }
        ]
        this.enableds = false
      } else {
        this.rules.farm_standard_other = [
          'other',
          { required: false, message: 'จำเป็นต้องใส่ข้อมูล' }
        ]
        this.enableds = true
        this.form1.farm_standard_other = ''
        // this.$refs.myFarmForm.validate(valid => {})
      }
    },
    addFarm () {
      // console.log('this.form1', this.form1)
      const options = {
        method: 'POST',
        headers: {
          Authorization: this.$cookies.get('token')
        },
        url: process.env.VUE_APP_URL + '/api/v1/farm/insertfarm',
        data: this.form1
      }
      this.axios(options)
        .then(res => {
          // console.log(res.data.data)
          // console.log('OK')
          if (res.data.status === 'success') {
            this.resetForm()
            this.$store.dispatch('fetchDataLand')
            this.$store.dispatch('closeDialogFarm')
            this.$swal.fire(
              'สำเร็จ',
              'คุณได้เพิ่มฟาร์มเรียบร้อยแล้ว',
              'success'
            )
            this.$emit('success')
          } else {
            this.$swal.fire(
              'เกิดข้อผิดพลาด',
              'กรุณาติดต่อผู้ดูแลระบบ',
              'error'
            )
          }
        })
        .catch(err => {
          this.$swal.fire('เกิดข้อผิดพลาด', 'กรุณาติดต่อผู้ดูแลระบบ', 'error')
          console.log(err)
        })
    },
    editFarm () {
      const options = {
        method: 'PUT',
        headers: {
          Authorization: this.$cookies.get('token'),
          farm_id: this.form1.farm_id
        },
        url: process.env.VUE_APP_URL + '/api/v1/farm/updatefarm',
        data: this.form1
      }
      // console.log('---options', options)
      this.axios(options)
        .then(res => {
          // console.log(res.data.data)
          if (res.data.status === 'success') {
            this.resetForm()
            this.$store.dispatch('fetchDataLand')
            this.$store.dispatch('closeDialogFarm')
            this.$swal.fire(
              'สำเร็จ',
              'คุณได้แก้ไขฟาร์มเรียบร้อยแล้ว',
              'success'
            )
            this.$emit('success')
          } else {
            this.$swal.fire(
              'เกิดข้อผิดพลาด',
              'กรุณาติดต่อผู้ดูแลระบบ',
              'error'
            )
          }
        })
        .catch(err => {
          this.$swal.fire('เกิดข้อผิดพลาด', 'กรุณาติดต่อผู้ดูแลระบบ', 'error')
          console.log(err)
        })
    },
    ValidateEditFarm () {
      this.$refs.myFarmForm.validate(valid => {
        if (valid) {
          this.$swal
            .fire({
              title: 'แก้ไขฟาร์ม',
              text: 'คุณต้องการแก้ไขฟาร์ม !',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ยืนยัน',
              cancelButtonText: 'ยกเลิก'
            })
            .then(result => {
              if (result.isConfirmed) {
                this.editFarm()
                // this.resetForm()
                //   this.$store.dispatch('fetchDataLand')
                //   this.$store.dispatch('closeDialogFarm')
                //   this.$swal.fire(
                //     'สำเร็จ',
                //     'คุณได้แก้ไขฟาร์มเรียบร้อยแล้ว',
                //     'success'
                //   )
                // } else {
              }
            })
        }
      })
    },
    handleSubmit () {
      this.$refs.myFarmForm.validate(valid => {
        if (valid) {
          this.$swal
            .fire({
              title: 'เพิ่มฟาร์ม',
              text: 'คุณต้องการเพิ่มฟาร์ม !',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'ยืนยัน',
              cancelButtonText: 'ยกเลิก'
            })
            .then(result => {
              if (result.isConfirmed) {
                this.addFarm()
                // this.resetForm()
                // this.$store.dispatch('fetchDataLand')
                // this.$store.dispatch('closeDialogFarm')
                // this.$swal.fire(
                //   'สำเร็จ',
                //   'คุณได้เพิ่มฟาร์มเรียบร้อยแล้ว',
                //   'success'
                // )
              } else {
              }
            })
        }
      })
    },

    resetForm () {
      // this.$refs.myFarmForm.resetFields()
      this.$store.dispatch('closeDialogFarm')
      this.resetRule()
      this.$refs.myFarmForm.resetFields()
    },

    onChange (e) {
      // console.log('radio checked', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.components-input-demo-size .ant-input {
  width: 100px;

  margin: 0 20px 20px 0;
}
@media only screen and (max-width: 1200px) {
  .AD {
    width: 45px;
    display: inline-block;
    // background-color:yellow;
  }
}
</style>
