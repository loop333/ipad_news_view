var video = null;
var playing = true;

function get_video_url(slug) {
  var url = 'https://www.livenewsnow.com/wp-json/wp/v2/posts?slug=' + slug;
  var re = /file: "(.*)"/g;

  return fetch(url).then(response => {
    if (response.status == 200) {
      return response.json();
    }
    throw new Error('Status: ' + response.status);
  }).then(data => {
    var html = data[0].content.rendered;
    var video_url = re.exec(html)[1];
    return video_url;
  });
}

function play_video(slug) {
  get_video_url(slug).then(url => {
    video = document.createElement('video')
    video.src = url;
    video.setAttribute('controls', '');
    video.setAttribute('autoplay', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('style', 'width: 100%;');

    video.addEventListener('error', event => {
      console.log('Video Error: ' + event.target.error.code);
    }, true);

    video.addEventListener('timeupdate', event => {
      playing = true;
    }, true);

    setInterval(() => {
      if (!playing) {
        get_video_url(slug).then(url => {
          console.log('set new src');
          video.src = url;
        });
      }
      playing = false;
    }, 5000);

    document.body.appendChild(video);
  }).catch(error => {
    console.log(error);
  });
}

