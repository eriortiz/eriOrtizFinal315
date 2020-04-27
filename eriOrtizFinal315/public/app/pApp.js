function deleteContentListener() {
  $('.recipeButton').click(function (e) {
    let id = e.target.id;

    PRACTICE_SERVICE.deleteContent(id, displayData);
  });
}

function initUpdate() {
  $('.recipebutton1').click(function (e) {
    console.log(`.recipebutton1 link is running`);
    var recipeName = e.target.dataset.name;
    loadContent('editrecipe');
    loadRecipe(recipeName);
  });
}

function loadRecipe(recipeName) {
  let recipeRef = PRACTICE_SERVICE.getRecipe(recipeName);
  let recipe = recipeRef[0].data();
  $('#recipe-name').val(recipe.name);
  $('#recipe-description').val(recipe.description);
  $('#recipe-servings').val(recipe.servings);
  $('#recipe-totaltime').val(recipe.totaltime);

  $('#update-button').data('id', recipeRef.id);
  $('#update-button').click(function (e) {
    let id = e.target.dataset.id;
    let nName = $('#recipe-name').val();
    let nDescription = $('#recipe-description').val();
    let nServings = $('#recipe-servings').val();
    let nTotalTime = $('#recipe-totaltime').val();

    recipeObj = {
      Name: nName,
      Description: nDescription,
      Servings: nServings,
      TotalTime: nTotalTime,
    };
    PRACTICE_SERVICE.updateRecipe(id, recipeObj);
  });
}

function displayData(addData) {
  $('.recipeList').html('');

  var recipeDiv;
  addData.forEach(function (docRef) {
    let doc = docRef.data();
    recipeDiv += `
    <div class="recipe">
    <div class='recipeImage' style='backgroundImage:${doc['Image']}'></div>
      <div class='recipeInfo'>
        <div class='recipeTitle'>${doc['Name']}</div>
        <div class='recipeSummary'>${doc['Description']}</div>
        <div class='recipeCookTime'>${doc['Total Time']}</div>
        <div class='recipeServingSize'>${doc['Servings']}</div>
      </div>
      <button class='recipeButton1' id='${docRef.id}'>Edit Recipe</button>
      <button class='recipeButton' id='${docRef.id}'>Delete</button>
    </div>`;
  });
  $('.recipeList').append(recipeDiv);
  initUpdate();
  deleteContentListener();
}

function init() {
  console.log('Firebase Connected');
  $('#recipes').click(function (e) {
    PRACTICE_SERVICE.getAllData(displayData);
  });

  $('#create').click(function (e) {
    recipeListener();
  });

  $('#addData').click(function (e) {
    e.preventDefault();
    let nName = $('#nav-input').val().trim().toLowerCase();

    if (nName != '') {
      PRACTICE_SERVICE.checkPages(nName);
      $('#nav-input').val('');
    } else {
      alert('add name');
    }
  });

  $('#checkPages').click(function (e) {
    e.preventDefault();
    PRACTICE_SERVICE.checkPages('products');
  });
}

$(document).ready(function () {
  PRACTICE_SERVICE.initFirebase(init);
});

function loginListener() {
  $('#signupButton').click(function (e) {
    e.preventDefault();
    let nFirstName = $('#myFirstName').val().trim().toLowerCase();
    let nLastName = $('#myLastName').val().trim().toLowerCase();
    let nEmail = $('#myEmail').val().trim().toLowerCase();
    let nPassword = $('#myPassword').val().trim().toLowerCase();

    if (
      nFirstName != '' ||
      nLastName != '' ||
      nEmail != '' ||
      nPassword != ''
    ) {
      PRACTICE_SERVICE.checkSignup(nFirstName, nLastName, nEmail, nPassword);
      $('#myEmail').val('');
    } else {
      alert('Sign In');
    }
  });

  $('#loginButton').click(function (e) {
    e.preventDefault();
    let nEmail = $('#myEmail').val().trim().toLowerCase();
    let nPassword = $('#myPassword').val().trim().toLowerCase();

    if (nEmail != '' || nPassword != '') {
      PRACTICE_SERVICE.checkLogin(nEmail, nPassword);
      $('#myPassword').val('');
    } else {
      alert('Wrong Login');
    }
  });
}

function recipeListener() {
  $('#addData').click(function (e) {
    console.log('Anything');
    let nName = $('#recipe-name').val().trim().toLowerCase();
    let nDescription = $('#recipe-description').val().trim().toLowerCase();
    let nServings = $('#recipe-servings').val().trim().toLowerCase();
    let nTotalTime = $('#recipe-totaltime').val().trim().toLowerCase();

    if (
      nName != '' ||
      nDescription != '' ||
      nServings != '' ||
      nTotalTime != ''
    ) {
      let nObj = {
        Name: nName,
        Description: nDescription,
        Servings: nServings,
        'Total Time': nTotalTime,
      };

      PRACTICE_SERVICE.checkRecipe(nObj);
      $('#recipe-name').val('');
    } else {
      alert('Recipe Needs Info');
    }
  });
}
