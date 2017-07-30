angular.module('studionet')
.controller('HomepageController', ['$scope', 'profile', 'spaces', 'contributions', 'tags',
                            function($scope, profile, spaces, contributions, tags){

          $scope.$emit('showBench');
          $scope.$emit('hideSearch');

          $scope.$emit('clearQuery');

          $scope.tags = tags.tagsHash;

          // get user
          // user.follows - will give all the user subscriptions along with the personally assigned names
          // user.curates - will give all the user forks/folders along with the personally assigned names
          $scope.spaces = spaces.spacesHash;
          $scope.user = profile.user;


          // compute the recent posts
          $scope.recentPosts = [];
          var latestCount = 0;
          var getRecent = function(){

            var newcount = latestCount + 10;
            if(newcount >= contributions.contributions.length)
              return;

            for(var i=latestCount + 1; i <= newcount; i++){
              var newpost = contributions.contributions[contributions.contributions.length - i];
              if(newpost.tags.length > 0 && newpost.type != "comment")
                $scope.recentPosts.push(contributions.contributions[contributions.contributions.length - i]);
              else
                newcount += 1;
            }

            latestCount = newcount ;


          }
          $scope.getRecent = getRecent;
          contributions.registerObserverCallback(function(){ $scope.recentPosts =[]; latestCount = 0; getRecent(); });

          // show the users currently online
          $scope.usersOnline = [
              {"name" : "John", "profile": "http://placehold.it/150x150" },
              {"name" : "Jane", "profile": "http://placehold.it/150x150" },
              {"name" : "Ivan", "profile": "http://placehold.it/150x150" },
              {"name" : "Laura", "profile": "http://placehold.it/150x150" },
              {"name" : "Shi", "profile": "http://placehold.it/150x150" },
              {"name" : "Petunia", "profile": "http://placehold.it/150x150" },
              {"name" : "Heidi", "profile": "http://placehold.it/150x150" }
          ];

          // updates the status of the timed tags
          $scope.getStatus = function(times){

              if(times == null)
                return {style: {"background-color": "#98F398"}};

              // improve later
              var expiry = times[1];
              var today = new Date();
              var difference = expiry - today; 

              var days = Math.floor(difference/86400000);

              var status = {msg: "days till expiry", "time_left": 4, style: {"background-color": "#77BB77"}}
              status.time_left = days;

              if(days<=0){
                status.msg = "days since expired";
                status.time_left = days;
                status.style = {"background-color": "#B8B0B0"};
              }
              else if(days < 4){
                status.msg = "Expiring soon!";
                status.time_left = days;
                status.style = {"background-color": "#F18D8D"};
              }


              return status;

          }

          // gets the space url associated with the tag; 
          // shift this to service
          



}]);
