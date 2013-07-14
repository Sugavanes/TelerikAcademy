// Generated by CoffeeScript 1.4.0
(function() {

  this.Persister = (function() {

    function Persister(rootURL, http, encode) {
      this.rootURL = rootURL;
      this.http = http;
      this.encode = encode;
      if (localStorage.sessionKey != null) {
        this.sessionKey = localStorage.sessionKey;
      }
      if (localStorage.nickname != null) {
        this.nickname = localStorage.nickname;
      }
    }

    Persister.prototype.login = function(data) {
      var url,
        _this = this;
      url = this.rootURL + 'user/login/';
      data = _.clone(data);
      data.authCode = this.encode(data.username + data.password);
      delete data.password;
      return this.http.postJSON(url, data).done(function(data) {
        _this.sessionKey = data.sessionKey;
        _this.nickname = data.nickname;
        localStorage.sessionKey = data.sessionKey;
        return localStorage.nickname = data.nickname;
      });
    };

    Persister.prototype.register = function(data) {
      var url;
      url = this.rootURL + 'user/register/';
      data = _.clone(data);
      data.authCode = this.encode(data.username + data.password);
      delete data.password;
      return this.http.postJSON(url, data);
    };

    Persister.prototype.logout = function() {
      var url,
        _this = this;
      url = this.rootURL + 'user/logout/' + this.sessionKey;
      return this.http.getJSON(url).done(function() {
        delete _this.sessionKey;
        delete localStorage.sessionKey;
        delete _this.nickname;
        return delete localStorage.nickname;
      });
    };

    Persister.prototype.scores = function() {
      var url;
      url = this.rootURL + 'user/scores/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.isLoggedIn = function() {
      return this.sessionKey != null;
    };

    Persister.prototype.getNickname = function() {
      return this.nickname;
    };

    Persister.prototype.createGame = function(data) {
      var url;
      url = this.rootURL + 'game/create/' + this.sessionKey;
      data = _.clone(data);
      if ((data.password != null) && data.password !== '') {
        data.password = this.encode(data.password);
      } else {
        delete data.password;
      }
      return this.http.postJSON(url, data);
    };

    Persister.prototype.joinGame = function(data) {
      var url;
      url = this.rootURL + 'game/join/' + this.sessionKey;
      data = _.clone(data);
      if ((data.password != null) && data.password !== '') {
        data.password = this.encode(data.password);
      } else {
        delete data.password;
      }
      return this.http.postJSON(url, data);
    };

    Persister.prototype.startGame = function(id) {
      var url;
      url = this.rootURL + 'game/' + id + '/start/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.getGameField = function(id) {
      var url;
      url = this.rootURL + 'game/' + id + '/field/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.getOpenGames = function() {
      var url;
      url = this.rootURL + 'game/open/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.getMyActiveGames = function() {
      var url;
      url = this.rootURL + 'game/my-active/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.getMyColor = function(id, success, fail) {
      var nickname;
      nickname = this.getNickname();
      return this.getMyActiveGames().done(function(games) {
        var color, creator;
        creator = games.filter(function(game) {
          return game.id === id;
        })[0].creator;
        color = creator === nickname ? 'red' : 'blue';
        return success(color);
      });
    };

    Persister.prototype.battleMove = function(data, id) {
      var url;
      url = this.rootURL + 'battle/' + id + '/move/' + this.sessionKey;
      return this.http.postJSON(url, data);
    };

    Persister.prototype.battleAttack = function(data, id) {
      var url;
      url = this.rootURL + 'battle/' + id + '/attack/' + this.sessionKey;
      return this.http.postJSON(url, data);
    };

    Persister.prototype.battleDefend = function(data, id) {
      var url;
      url = this.rootURL + 'battle/' + id + '/defend/' + this.sessionKey;
      return this.http.postJSON(url, data);
    };

    Persister.prototype.getUnreadMessages = function() {
      var url;
      url = this.rootURL + 'messages/unread/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    Persister.prototype.getAllMessages = function() {
      var url;
      url = this.rootURL + 'messages/all/' + this.sessionKey;
      return this.http.getJSON(url);
    };

    return Persister;

  })();

}).call(this);