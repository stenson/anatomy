
  var pattern = embroid({
    width: 300,
    height: 300,
    iterations: 1000,
    iterator: function(i, x, y, ctx) {
      (Math.random() < 0.5) ?
        ctx.fillStyle = "rgba(255,255,255,0.05)" :
        ctx.fillStyle = "rgba(255,255,255,0.1)";
      var len = embroid.random(10,25);
      (Math.random() < 0.5) ?
        ctx.fillRect(x, y, 1, len) :
        ctx.fillRect(x, y, len, 1);
    }
  });

  $("body").css("background-image", "url("+pattern+")");
  
  // get a tweet
  var hfj = "86462332187852800";
  var id = "89820404679573505";
  var id = hfj;
  
  $.ajax({
    url: "https://api.twitter.com/1/statuses/show/"+id+".json?include_entities=true&callback=?",
    type: "jsonp",
    success: function(data) {
      console.log(data);
      renderTweet(data);
      renderUserInfo(data.user);
    }
  });
  
  var renderUserInfo = function(user) {
    $("#profile-background").css("background","url("+user.profile_background_image_url+")");
  };
  
  var renderTweet = function(tweet) {
    var entities = listEntities(tweet.entities);
    var text = tweet.text.split("");
    var spans = [];
    
    var last = [];
    var i = 0;
    var l = text.length;
    
    while(i < l) {
      if(i in entities) {
        var entity = entities[i];
        var r = entity.record;
        var chars = r.display_url || text.slice(i,entity.stop).join("");
        spans.push("<span class='highlight'><em class='"+entity.type+"'>"+chars+"</em></span>");
        i = entity.stop + 1;
      }
      else { // plain text
        var c = text[i];
        if(c == " ") {
          spans.push("<span>"+last.join("")+"</span>");
          last = [];
        } else {
          last.push(c);
        }
        i += 1;
      }
    }
    if(last.length > 0) {
      spans.push("<span>"+last.join("")+"</span>");
    }
    // set the text
    $("#tweet").html(spans.join(""));
    
    $("#author").text("@"+tweet.user.screen_name);
    $("#attribution").append($.cabin("img.icon",{
      src: tweet.user.profile_image_url
    }));
  };
  
  var listEntities = function(entities) {
    var results = {};
    $.each(["hashtags", "urls", "user_mentions"], function(which){
      $.each(entities[which], function(entity){
        results[entity.indices[0]] = {
          type: which,
          stop: entity.indices[1],
          record: entity
        };
      });
    });
    return results;
  };