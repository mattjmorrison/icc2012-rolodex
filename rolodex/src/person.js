Person = (function($) {

  var PersonObject = function(params) {
    this.username = params.username;
    this.url = params.url;
    this.tbody = params.tbody;
    this.errors = params.errors;
  };

  PersonObject.prototype.addPerson = function() {
    var username = this.username.val();
    if (username){
      this.doHttpPostWithPersonData(username);
      this.errors.text('');
    }
    else {
      this.errors.text('please enter a valid username');
    }
  };

  PersonObject.prototype.doHttpPostWithPersonData = function(username) {
    $.post(this.url, {"username": username}, this.addPersonCallback.bind(this));
  };

  PersonObject.prototype.addPersonCallback = function(response) {
    this.addPersonToHtml(response);
    this.username.val('');
  };

  PersonObject.prototype.removePerson = function(personId) {
    $.ajax({
      "type": "DELETE",
      "url": this.url + '/' + personId,
      "success": this.removePersonCallback.bind(this, personId)
    });
  };

  PersonObject.prototype.removePersonCallback = function(personId) {
    $('#person_' + personId).remove();
  };

  PersonObject.prototype.addPersonToHtml = function(person) {
    var row = $('<tr id="person_' + person.id + '" />');
    row.append($('<td>' + person.id + '</td>'));
    row.append($('<td>' + person.username + '</td>'));
    row.append($('<td><a href="#" onclick="person.removePerson(' + person.id + '); return false;">delete</a>'));
    this.tbody.append(row);
  };

  PersonObject.prototype.findAll = function() {
    $.getJSON(this.url, this.findAllCallback.bind(this));
  };

  PersonObject.prototype.buildListOfPeopleFromResponse = function(response) {
    return response;
  };

  PersonObject.prototype.appendPeopleToHtml = function(people) {
    people.forEach(function(person){
      this.addPersonToHtml(person);
    }.bind(this));
  };

  PersonObject.prototype.findAllCallback = function(response) {
    var people = this.buildListOfPeopleFromResponse(response);
    this.appendPeopleToHtml(people);
  };

  return PersonObject;

})(jQuery);

root = typeof exports !== "undefined" && exports !== null ? exports : this;
root.Person = Person;
