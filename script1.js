(function() {
  function artistElement(artist) {
    var img = artist.images[0] || { url: 'http://placehold.it/64x64' }

    return `
<div class="media artist" data-id="${artist.id}">
<div class="media-left">
<img class="media-object" src="${img.url}" />
</div>
<div class="media-body">
<strong>${"Artist Name: "+artist.name}</strong>

<ul class="album-list">
</ul>
</div>
</div>
`
  }

  function artistListElement(artists) {
    var html = ''

    artists.forEach(function(artist) {
      html += artistElement(artist)
    })

    return html
  }

  function albumListElement(albums) {
    
    var html = ''
    var hh =new Array(5)
    html = `<li class="artist" data-id=${albums.id}>${"<strong>Popularity: </strong>"+albums.popularity }</li>`
    html+=`<li class="artist" data-id=${albums.id}>${"<strong>Genres: </strong>"+albums.genres}</li>`   
  

return html
 
  }
  
  function search (arr)
  { for (i=0;i<arr.length;i++)
          {if (arr[i]== 'US')
            return 1
          }
    return 0
  }
   function artistalbum(e,id)
  {   var htm3=''
  htm3+=`</div class="artist"><P><strong>${"Albums Available in US : "}</strong></P>`
      var j=0
     var img
 
     
     for(k=0;k<e.items.length;k++)
     {
        if (search(e.items[k].available_markets) && j<3)
        {  
            img =e.items[k].images[0] || { url: 'http://placehold.it/64x64' }
            htm3+= `<p><img class="artist" src="${img.url}  " />${e.items[j].name }</p>`
                    
              j+=1
          }
    }
   
   j=0
   htm3+=`</div>`
    return htm3
  }
  
  function relatedListElement(d,id) {
    
    var htm=''
  
     htm = `<li class="artist" data-id=${id}>${"<strong>Related Artist: <br> </strong>-->"+d.artists[0].name
      +"<br>-->"+d.artists[1].name
      +"<br>-->"+d.artists[2].name
      +"<br>-->"+d.artists[3].name
      +"<br>-->"+d.artists[4].name}</li>`
    
      return htm 
  }


  $('#artist-search').on('submit', function(event) {
    event.preventDefault()

    var data = $(event.target).serialize()
    var request = $.get('https://api.spotify.com/v1/search', data)

    request.done(function(response) {
      var artistList = artistListElement(response.artists.items)

      $('#artist-list').html(artistList)
    })
  })
  
  $('#artist-list').on('click', '.artist', function(event) {
    $('.album-list').empty()
    var id = $(event.currentTarget).data('id')
    var request = $.get('https://api.spotify.com/v1/artists/' + id )
    
    request.done(function(response) {
      var data =JSON.parse(request.responseText)

      var albumList = albumListElement(data)
   
      $(event.currentTarget).find('.album-list').html(albumList)
    })
    
    var c = $.get('https://api.spotify.com/v1/artists/'+id+'/related-artists/')
   
    c.done(function(response) {
      var d =JSON.parse(c.responseText)
     
      var realted = relatedListElement(d,id)

      $(event.currentTarget).find('.album-list').append(realted)
    })
    
    var e=  $.get('https://api.spotify.com/v1/artists/'+id+'/albums')
 
    
    e.done(function(response) {
      var d =JSON.parse(e.responseText)
      
      var albm = artistalbum(d,id)

      $(event.currentTarget).find('.album-list').append(albm)
    })
    
  })


})()

