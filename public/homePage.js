'use strict'

let userLogout = new LogoutButton()

userLogout.action = function () {
  ApiConnector.logout(response => {
      //console.log(response);
      location.reload()
  })
}

function person () {
  ApiConnector.current(response => {
      ProfileWidget.showProfile(response.data)
  })
}
person()

let rate = new RatesBoard()

function rateTable () {
  return ApiConnector.getStocks(response => {
      //console.log(response.success, response.data)
      if (response.success === true) {
        //if (rate.tableBody === undefined) {
          rate.clearTable()
        //}
        rate.fillTable(response.data)
      }
  })
}

rateTable()

let interval = setInterval(() => {
  rateTable()
}, 60000)

let money = new MoneyManager()

let data = {}
money.addMoneyCallback = data => {
  return ApiConnector.addMoney(data, response => {
      //console.log('add balance ', response)
      if (response.success === false) {
        const message = 'balance not added'
        money.setMessage(response.success, response.error)
      } else {
        ProfileWidget.showProfile(response.data)
        const message = 'balance added successfully'
        money.setMessage(response.success, message)
      }
  })
}

let dataConvert = {}
money.conversionMoneyCallback = dataConvert => {
  //console.log(dataConvert)
  return ApiConnector.convertMoney(dataConvert, response => {
      //  console.log('convert balance ', response)
      if (response.success === false) {
        const message = 'conversion failed'
        money.setMessage(response.success, response.error)
      } else {
        ProfileWidget.showProfile(response.data)
        const message = 'convert is successfully'
        money.setMessage(response.success, message)
      }
  })
}

let dataSend = {}
money.sendMoneyCallback = dataSend => {
  //console.log(dataSend)
  return ApiConnector.transferMoney(dataSend, response => {
      // console.log('transfer ', response)
      if (response.success === false) {
        const message = 'transfer failed'
        money.setMessage(response.success, response.error)
      } else {
        ProfileWidget.showProfile(response.data)
        const message = 'transfer is successfully'
        money.setMessage(response.success, message)
      }
   })
}

let fav = new FavoritesWidget()

ApiConnector.getFavorites(response => {
    //console.log(response.success, response.data)
    if (response.success === true) {
      //if (fav.favoritesTableBody === undefined) {
        fav.clearTable()
      //}
      fav.fillTable(response.data)
      money.updateUsersList(response.data)
    }
})

let dataId = {}
fav.addUserCallback = dataId => {
  //console.log(dataId)
  return ApiConnector.addUserToFavorites(dataId, response => {
      // console.log('ID-- ', response)
      if (response.success === false) {
        const message = 'ID add failed'
        fav.setMessage(response.success, response.error)
      } else {
        const message = 'ID added successfully'
        fav.setMessage(response.success, message)
        console.log(response.success, response.data)
        if (response.success === true) {
          //if (fav.favoritesTableBody === undefined) {
          fav.clearTable()
          //}
          fav.fillTable(response.data)
          money.updateUsersList(response.data)
        }
      }
  })
}

let dataDel = {}
fav.removeUserCallback = dataDel => {
  //console.log(dataId)
  return ApiConnector.removeUserFromFavorites(dataDel, response => {
      // console.log('ID-- ', response)
      if (response.success === false) {
        const message = 'ID delete failed'
        fav.setMessage(response.success, response.error)
      } else {
        const message = 'ID deleted successfully'
        fav.setMessage(response.success, message)
        //console.log(response.success, response.data)
        if (response.success === true) {
          //if (fav.favoritesTableBody === undefined) {
          fav.clearTable()
          //}
          fav.fillTable(response.data)
          money.updateUsersList(response.data)
        }
      }
  })
}

