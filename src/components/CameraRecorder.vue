<template>
  <div class="publish">
    <!-- 下载按钮 -->
    <a id="downLoadLink" style="display: none;"></a>
    <video ref="videoRef"></video>

    <!--    <video controls autoplay muted style="width: 200px;height: 200px" :src="dataUrl"></video>-->
    <!-- 视频录制或暂停 -->
    <!--    <div @click="recordOrStop">{{ isRecording ? '录制中' : '未开始' }}</div>-->
    <div>{{ isRecording ? '录制中' : '未开始' }}</div>
  </div>
</template>

<script>import {onMounted, ref} from 'vue';
import {message} from 'ant-design-vue';

export default {
  emits: ['sendVideoUrl'],
  setup(props, {emit}) {
    const dataUrl = ref('')
    var mediaRecorder
    const videoRef = ref(null);
    const mediaStreamTrack = ref(null);
    const videoStream = ref(null);
    const recordedBlobs = ref([]);
    const isRecording = ref(false);


    const getCamera = async () => {
      if (!navigator.mediaDevices) {
        navigator.mediaDevices = {};
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({video: true});
        mediaStreamTrack.value = stream.getTracks()[0];
        videoStream.value = stream;
        videoRef.value.srcObject = stream;
        videoRef.value.play();
      } catch (err) {
        console.error(err);
        message.error('你的浏览器不支持，摄像头开启失败');
      }
    };

    const recordOrStop = () => {
      if (isRecording.value) {
        stopRecording();
      } else {
        startRecording();
      }
    };

    const startRecording = async () => {
      isRecording.value = true;

      // 重新获取媒体流
      const newStream = await navigator.mediaDevices.getUserMedia({video: true});

      // 如果之前的流存在，则先停止其轨道
      if (videoStream.value) {
        const oldTracks = videoStream.value.getTracks();
        oldTracks.forEach(track => track.stop());
      }

      // 更新videoStream引用
      videoStream.value = newStream;
      videoRef.value.srcObject = newStream;
      videoRef.value.play();

      // 重置MediaRecorder实例
      mediaRecorder = new MediaRecorder(newStream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
            ? 'video/webm;codecs=vp9'
            : 'video/webm;codecs=h264',
      });

      mediaRecorder.start();
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          recordedBlobs.value.push(e.data);
        }
      };
      mediaRecorder.onstop = handleStopRecording;
    };

    const stopRecording = () => {
      isRecording.value = false;
      // 添加以下两行代码以停止MediaRecorder实例
      mediaRecorder.stop();
      mediaRecorder = null; // 清除MediaRecorder实例
      if (mediaStreamTrack.value) {
        mediaStreamTrack.value.stop();
      }
      if (videoStream.value) {
        const tracks = videoStream.value.getTracks();
        tracks.forEach(track => track.stop());
      }
      if (videoStream.value && videoStream.value.active) {
        videoStream.value.getTracks().forEach(track => track.stop());
      }
    };

    const handleStopRecording = () => {
      const blob = new Blob(recordedBlobs.value, {type: 'video/mp4'});
      const videoUrl = URL.createObjectURL(blob);

      const reader = new FileReader();
      reader.readAsDataURL(blob)
      reader.onloadend = function () {
        const base64String = reader.result
        dataUrl.value = base64String
        emit('sendVideoUrl', base64String)
      }

      console.log('videoUrl', videoUrl)
      document.getElementById('downLoadLink').href = videoUrl;
      document.getElementById('downLoadLink').download = 'media.mp4';
      document.getElementById('downLoadLink').click();
      message.success("你的绘画记录视频已经自动保存到了本地，请注意查收")
      recordedBlobs.value = [];
    };

    onMounted(() => {
      getCamera();
    });

    return {
      videoRef,
      recordOrStop,
      isRecording,
      dataUrl,
    };
  },
};

</script>

<style lang="less" scoped>.publish {
  color: #fff;

  video {
    width: 100%;
    height: 100%;
  }

  div {
    font-weight: bold;
    cursor: pointer;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 30px;
    transform: translateX(50%);
    width: 60px;
    //border-radius: 50%;
    border-radius: 10px;
    font-size: 16px;
    line-height: 30px;
    //opacity: .5;
    background-color: rgb(25, 179, 179);
    text-align: center;
  }
}
</style>