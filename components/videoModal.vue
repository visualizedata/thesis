<template>
	<div class="modal" id="video-box">
	  <a href="#close-box" class="close">x</a> 
	  <div class="video-player">
	      <video controls ref="video">
        <source v-bind:src="student.videolink" type="video/mp4">
	      </video>
	  </div>
	</div> 
</template>


<script>
export default {
  name: "videoModal",
  }
</script>



.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0,1); 
  transition: transform 150ms ease-in-out;
  transform-origin: right; 
  position: fixed;
  top: 0;
  left: 0;
  color: white;
  background: rgba(0, 0, 0, .5);
  // box-shadow: 0 0 0 100vmax rgba(0, 0, 0, .25);
  width: 100%;
  height: 100%;
  z-index: 2;
}

.modal:target {
  transform: scale(1,1);
  transform-origin: left; 

}

video {
  width: 100%;
  height: auto;
}

.video-player {
  width: 80%;
  height: auto;
  padding: .5em;
  background: black;
  position: relative;
}

.close {
  position: absolute;
  left: 2%;
  top: 2%;
  display: flex;
  width: 2em;
  height: 2em;
  background: white;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  z-index: 3;
}

.close::after {
  color: red;
}