//NOTE: THIS FILE IS GENERATED AUTOMATICALLY AND IGNORED BY GIT. DON'T MESS WITH IT
/*jshint ignore:start*/
angular.module('<%= module %>')<% Object.keys(constants).forEach(function(key) { %>
  .constant('<%= key %>', <%= JSON.stringify(constants[key]) %>)<% }); %>;
/*jshint ignore:end*/