'use strict'

let userLogout = new LogoutButton()

userLogout.action = function () {
  ApiConnector.logout(error => {
    try {
      //console.log(error);
      location.reload()
    } catch (error) {
      return error
    }
  })
}

ApiConnector.current(error => {
  console.log(error)
  try {
    ProfileWidget.showProfile(error.data)
  } catch (error) {
    console.log(error)
  }
})
