export function deserializeArticlesListJSON(response_body) {
  var obj = JSON.parse(response_body);
  if (obj.articles) {
    var obj1 = obj.articles;
    for (var a = 0; a < obj1.length; a++) {
      var obj2 = obj1[a];
      if (obj2.createdDate) {
        obj2.createdDate = new Date(obj2.createdDate);
      }
      if (obj2.comments) {
        var obj3 = obj2.comments;
        for (var b = 0; b < obj3.length; b++) {
          var obj4 = obj3[b];
          if (obj4.createdDate) {
            obj4.createdDate = new Date(obj4.createdDate);
          }
        }

      }
    }

  }

  return obj;
}

export function deserializeArticleJSON(response_body) {
  var obj = JSON.parse(response_body);
  if (obj.createdDate) {
    obj.createdDate = new Date(obj.createdDate);
  }
  if (obj.comments) {
    var obj1 = obj.comments;
    for (var a = 0; a < obj1.length; a++) {
      var obj2 = obj1[a];
      if (obj2.createdDate) {
        obj2.createdDate = new Date(obj2.createdDate);
      }
    }

  }

  return obj;
}

export function deserializeCommentJSON(response_body) {
  var obj = JSON.parse(response_body);
  if (obj.createdDate) {
    obj.createdDate = new Date(obj.createdDate);
  }

  return obj;
}

