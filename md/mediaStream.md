## Media Capture and Streams API (미디어 스트림)
Media Streams API, 짧게는 MediaStream API라고 불리는 Media Capture and Streams API는 오디오와 비디오 데이터 스트리밍을 지원하는 [WebRTC](https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API) 관련 API 이다. 이 API는 미디어 스트림과 스트림을 구성하는 트랙, 데이터 형식과 관련된 제한인자, 데이터를 비동기적으로 사용할 때의 성공과 오류 콜백, 그리고 이 과정에서 발생하는 이벤트에 대한 인터페이스 및 메서드를 제공한다.

출처 : https://developer.mozilla.org/ko/docs/Web/API/Media_Streams_API

### 특징
MediaStream 객체는 하나의 입력과 하나의 출력을 가진다. [getUserMedia()](https://developer.mozilla.org/ko/docs/Web/API/MediaDevices/getUserMedia)로 생성한 MediaStream 객체는 "로컬" 미디어 스트림이라고 부르며, 사용자의 카메라와 마이크 중 하나를 입력 출처로 사용한다.

### 인터페이스 
- [BlobEvent (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/BlobEvent)
- [CanvasCaptureMediaStreamTrack](https://developer.mozilla.org/ko/docs/Web/API/CanvasCaptureMediaStreamTrack)
- [InputDeviceInfo (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/InputDeviceInfo)
- MediaDeviceKind
- [MediaDeviceInfo (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo)
- [MediaDevices](https://developer.mozilla.org/ko/docs/Web/API/MediaDevices)
- [MediaStream (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream)
- [MediaStreamConstraints (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia)
- [MediaStreamEvent (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamEvent)
- [MediaStreamTrack](https://developer.mozilla.org/ko/docs/Web/API/MediaStreamTrack)
- [MediaStreamTrackEvent (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrackEvent)
- MediaTrackCapabilities
- [MediaTrackConstraints](https://developer.mozilla.org/ko/docs/Web/API/MediaTrackConstraints)
- [MediaTrackSettings (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSettings)
- [MediaTrackSupportedConstraints (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackSupportedConstraints)
- NavigatorUserMedia
- NavigatorUserMediaError
- [OverconstrainedError (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/OverconstrainedError)

### 이벤트 
- [addtrack](https://developer.mozilla.org/ko/docs/Web/Reference/Events/addtrack)
- [ended (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/ended_event)
- [muted](https://developer.mozilla.org/ko/docs/Web/Reference/Events/muted)
- [overconstrained](https://developer.mozilla.org/ko/docs/Web/Reference/Events/overconstrained)
- [removetrack](https://developer.mozilla.org/ko/docs/Web/Reference/Events/removetrack)

