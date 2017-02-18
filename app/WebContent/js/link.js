function jumpAdd() {	
  var form = document.getElementById("dummyForm");
  form.action = "/add";
  form.method = "POST";

  form.submit();
}

function jumpEdit() {	
  var form = document.getElementById("dummyForm");
  form.action = "/edit";
  form.method = "POST";
  form.submit();
}

function jumpSave() {	
  var form = document.getElementById("dummyForm");
  form.action = "/save";
  form.method = "POST";
  form.submit();
}

function jumpDelete() {	
  var form = document.getElementById("dummyForm");
  form.action = "/delete";
  form.method = "POST";
  form.submit();
}

function jumpInfo(id) {	
  var form = document.getElementById("dummyForm");
  form.action = "/info";
  form.method = "POST";

  var input = document.createElement("input");
  input.type = "hidden";
  input.name = "id";
  input.value = id;

  form.appendChild(input);
  form.submit();
}

function jumpList() {	
  var form = document.getElementById("dummyForm");
  form.action = "/list";
  form.method = "GET";
  form.submit();
}
