<template>
  <div :class="['collect-items', {isOpened}]">
    <div class="selected-items" @click="isOpened = true">{{selected ? selected : 'Selecione uma categoria'}}</div>

    <div class="search-items" v-if="isOpened">
      <div class="d-flex align-items-center">
        <b-form-group class="position-relative d-inline-block w-100 mb-0 search-input">
          <b-form-input v-model="search" class="input-border search-input w-100" type="text" @keyup="filter(search)"
                        placeholder="Tran Mau Tri Tam"/>
        </b-form-group>
        <button class="btn btn-search ml-2">+</button>
      </div>

      <div class="list-data">
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
        <span class="item-list" @click="selectItem('Items')">Items</span>
      </div>


    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      search: null,
      isOpened: false,
      selected: ''
    }
  },
  methods: {
    filter(value){

    },
    selectItem(value){
      this.isOpened = false;
      this.selected = value;
      this.$emit('return-selection', value);
    }
  }
}
</script>

<style scoped>
.collect-items {
  position: relative;
  border: 1px solid #A7A7AB;
  border-radius: 8px;
  background: url("assets/img/utils/ico-arrow-dropdown-grey.svg") no-repeat 93% 19px;
  color: #373740;
  font-weight: 500;
  font-size: 14px;
}

.selected-items {
  height: 44px;
  padding: 12px 16px;
}

.collect-items.isOpened {
  border: 1px solid #89238A;
  background: url("assets/img/utils/ico-arrow-dropdown-purple.svg") no-repeat 93% 19px;
}

.search-items {
  background: #FFFFFF;
  border: 1px solid #F2F2F2;
  box-shadow: 0px 12px 23px rgb(53 55 60 / 10%);
  border-radius: 8px;
  position: absolute;
  top: 48px;
  padding: 16px;
  width: 100%;
}

.list-data {
  position: relative;
  max-height: 180px;
  margin-top: 24px;
  overflow-y: auto;
}

.item-list {
  cursor: pointer;
  display: block;
  line-height: 20px;
  margin-bottom: 24px;
}
</style>
