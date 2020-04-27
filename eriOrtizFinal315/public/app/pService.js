var PRACTICE_SERVICE = (function () {
  var _db;
  var _currentPageID;

  var _getAllData = function (callback) {
    _db
      .collection('Recipes')
      .get()
      .then(function (querySnapshot) {
        callback(querySnapshot);
      });
  };

  var _updateData = function (id, newContent, callback) {
    var newObj = { navName: newContent };

    _db
      .collection('Recipes')
      .doc(id)
      .update(newObj)
      .then(function () {
        _getAllData(callback);
      });
  };

  var _deleteData = function (id, callback) {
    _db
      .collection('Recipes')
      .doc(id)
      .delete()
      .then(function () {
        _getAllData(callback);
      });
  };

  var _addData = function (navName, callback) {
    _db
      .collection('Pages')
      .add(pageFakeData)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })

      .catch(function (error) {
        console.log('Error adding document: ', error);
      });
  };

  var _addUser = function (userObj, callback) {
    _db
      .collection('User')
      .add(userObj)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })

      .catch(function (error) {
        console.log('Error adding document: ', error);
      });
  };

  var _addRecipe = function (nObj, callback) {
    _db
      .collection('Recipes')
      .add(nObj)
      .then(function (docRef) {
        console.log('Document written with ID: ', docRef.id);
      })

      .catch(function (error) {
        console.log('Error adding document: ', error);
      });
  };

  var _checkRecipe = function (nObj) {
    var recipes = _db.collection('Recipes');
    recipes
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          console.log('empty ', querySnapshot.empty);
          _addRecipe(nObj);
        } else {
          recipes
            .where('Name', '==', nObj.Name)
            .get()
            .then(function (querySnapshot) {
              if (querySnapshot.empty) {
                console.log('add new recipe');
                _addRecipe(nObj);
              } else {
                console.log('duplicate');
              }
            })
            .catch(function (error) {
              console.error('Error adding document: ', error);
            });
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  var _checkSignup = function (myFirstName, myLastName, myEmail, myPassword) {
    var userObj = {
      firstName: myFirstName,
      lastName: myLastName,
      email: myEmail,
      password: myPassword,
    };
    var signup = _db.collection('User');
    signup
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          console.log('empty ', querySnapshot.empty);
          _addUser(userObj);
        } else {
          signup
            .where('username', '==', myUsername)
            .get()
            .then(function (querySnapshot) {
              if (querySnapshot.empty) {
                console.log('add new user');
                _addUser(userObj);
              } else {
                console.log('duplicate');
              }
            })
            .catch(function (error) {
              console.error('Error adding document: ', error);
            });
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  var _checkLogin = function (myUsername, myPassword) {
    var users = _db.collection('User');
    users
      .get()
      .then(function (querySnapshot) {
        if (querySnapshot.empty) {
          console.log('empty ', querySnapshot.empty);
        } else {
          users
            .where('username', '==', myUsername)
            .where('password', '==', myPassword)
            .get()
            .then(function (querySnapshot) {
              if (querySnapshot.empty) {
              } else {
              }
            })
            .catch(function (error) {
              console.error('Error adding document: ', error);
            });
        }
      })
      .catch(function (error) {
        console.log('error', error);
      });
  };

  var _initFirebase = function (callback) {
    firebase
      .auth()
      .signInAnonymously()
      .then(function (result) {
        _db = firebase.firestore();
        callback();
      });
  };

  return {
    initFirebase: _initFirebase,
    addData: _addData,
    getAllData: _getAllData,
    updateContent: _updateData,
    deleteContent: _deleteData,
    checkLogin: _checkLogin,
    checkSignup: _checkSignup,
    checkRecipe: _checkRecipe,
  };
})();
