'use strict'

let userLogout = new LogoutButton()

userLogout.action = function () {
  ApiConnector.logout(response => {
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
      if (response.success === true) {
          rate.clearTable()
        rate.fillTable(response.data)
      }
  })
}

rateTable()

setInterval(() => {
  rateTable()
}, 60000)

let money = new MoneyManager()

money.addMoneyCallback = data => {
  return ApiConnector.addMoney(data, response => {
      if (response.success === false) {
        money.setMessage(response.success, response.error)
      } else {
        ProfileWidget.showProfile(response.data)
        const message = 'balance added successfully'
        money.setMessage(response.success, message)
      }
  })
}

money.conversionMoneyCallback = dataConvert => {
  return ApiConnector.convertMoney(dataConvert, response => {
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

money.sendMoneyCallback = dataSend => {
  return ApiConnector.transferMoney(dataSend, response => {
      if (response.success === false) {
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
    if (response.success === true) {
        fav.clearTable()
      fav.fillTable(response.data)
      money.updateUsersList(response.data)
    }
})

fav.addUserCallback = dataId => {
  return ApiConnector.addUserToFavorites(dataId, response => {
      if (response.success === false) {
        fav.setMessage(response.success, response.error)
      } else {
        const message = 'ID added successfully'
        fav.setMessage(response.success, message)
        if (response.success === true) {
          fav.clearTable()
          fav.fillTable(response.data)
          money.updateUsersList(response.data)
        }
      }
  })
}

fav.removeUserCallback = dataDel => {
  return ApiConnector.removeUserFromFavorites(dataDel, response => {
      if (response.success === false) {
        fav.setMessage(response.success, response.error)
      } else {
        const message = 'ID deleted successfully'
        fav.setMessage(response.success, message)
          fav.clearTable()
          fav.fillTable(response.data)
          money.updateUsersList(response.data)
      }
  })
}

