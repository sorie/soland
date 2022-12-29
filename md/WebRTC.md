
"이전에 채팅을 구현할 때 내 채팅을 서버에 보내고 서버에서 브로드캐스팅하는 형태였지만! WebRTC는 서버를 거치지 않고 바로 데이터를 전송할 수 있는 것" <br/>
![image](https://user-images.githubusercontent.com/12015609/209526365-709e30b0-0687-4c14-88a3-5e75ed93d503.png)
출처 : https://ssocoit.tistory.com/219 [코딩하는 경제학도]


#### * MDN의 WebRTC 문서에서는 WebRTC를 다음과 같이 정의

"WebRTC(Web Real-Time Communication) 은 웹 애플리케이션과 사이트가 중간자 없이 브라우저 간에 오디오나 영상 미디어를 포착하고 마음대로 스트림 할 뿐 아니라, 임의의 데이터도 교환할 수 있도록 하는 기술입니다."

- 드라이버나 플러그인 설치 없이 웹 브라우저 간 P2P 연결을 통해 데이터 교환을 가능하게 하는 기술
- P2P 연결은 중개 서버를 거치지 않기 때문에 빠른 속도가 보장되며, HTTPS가 강제되기 때문에 중간자 공격에 대한 보안이 보장
- 실시간으로 상호작용 할 수 있다
- WebRTC는 구글이 주도한 오픈소스 프로젝트를 기반으로 하는 웹 표준이기 때문에, 특히 크롬(Chrome)에서 호환성이 높다.
- WebRTC는 아직까지 다양한 플랫폼에서 표준화가 완전히 구현되지는 않은 기술.
- 각 브라우저의 WebRTC API에는 moz, webkit 같은 벤더 프리픽스(vendor prefix)가 붙어있다.
- 크로스 브라우징 이슈를 해결하기 위해서는 adapter.js 라이브러리를 함께 사용하는 것이 필수.(이 라이브러리는 shim 패턴 및 폴리필을 이용해 다양한 브라우저에서 발생할 수 있는 크로스 브라우징 이슈를 사전에 처리, 벤더 프리픽스를 신경 쓸 필요 없이 동일한 API를 호출할 수 있게 만들어 주기 때문에, 코드 컨벤션 유지와 개발 생산성 향상에서도 큰 도움)
- WebRTC는 단일 브라우저 벤더에서 제공하는 API가 아니며, 브라우저와 운영체제별로 개발되는 속도와 지원되는 버전이 다르므로 호환성과 상호 운용성을 항상 체크해야 한다.

절차
- 각 브라우저가 P2P 커뮤니케이션에 동의
- 서로의 주소를 공유
- 보안 사항 및 방화벽 우회
- 멀티미디어 데이터를 실시간으로 교환

#### * 많은브라우저를 지원하지만 표준화가 완전하지 않아 브라우저마다 버전을 맞춰 줄 수 없어 adapter.js를 사용해호환을 맞춘다.

### WebRTC 통신 방식
- P2P(Peer to Peer) : 두 단말이 서로 1:1 통신하는 방식
- MCU, SFU : 대규모 서비스를 구축할 때 사용하는 방식, 중앙 서버를 두어 트래픽 중계하도록 함

#### 두기기가 실시간 소통을 하기 위해서 다음이 필요.
1. 기기의 스트리밍 오디오/비디오/데이터를 가져올 수 있을 것
2. 소통하고자 하는 기기의 IP 주소와 포트 등 네트워크 데어터가 필요
3. 에러 보고, 세션 초기화를 위해 신호 통신을 관리해야 함.
4. 서로 소통할 수 있는 해상도인지, 코덱은 맞는지 Capability 정보 교환
5. 실제 연결을 맺음.
6. 스트리밍 오디오/비디오/데이터 교환 가능.

#### WebRTC에서 제공하는 API 3가지
1. MediaStream : 사용자의 카메라 혹은 마이크 등 input 기기의 데이터스트림에 접근한다.
2. RTCPeerConnection : 암호화/ 대역폭 관리 기능. 오디오/비디오 연결을 한다.
3. RTCDataChannel : 일반적인 데이터 P2P 통신.

### 알고리즘
1. 각 Node는 RTCPeerConnection를 통해 연결에 대한 객체를 생성하고, 송신자(Caller)는 nevigator.getUserMedia를 통해 미디어 스트림을 콜백 받아 RTCPeerConnection에 입력한다. 
2. 미디어 정보를 입력하면 createOffer()를 통해 수신자에게 전달할 SDP를 생성한다.
3. sdp가 생성되면 Caller의 setLocalDescription()을 통해 로컬 SDP로 설정해주어야 한다. 
4. 설정이 완료되면 websocket 혹은 socket.io등을 통해 sdp와 candidate를 calle에게 전달하는데 이를 시그널링(Signalling)이라고 한다. 
5. Caller의 localDescription이 설정되어야 candidate를 수집할 수 있다. 
6. Callee는 전달받은 SDP를 RemoteDescription으로 설정해야 한다. 
7. 설정이 완료되면 Callee는 CreateAnswer()를 통해 Caller에게 보낼 SDP를 생성한다. 
8. Callee가 반환할 SDP를 생성했으면 Caller와 마찬가지로 LocalDescription을 설정해주고 Caller에게 전달해준다. 
9. Caller는 마찬가지고 전달받은 SDP를 RemoteDescription으로 설정한다.
10. 앞서 말한 LocalDescription이 완료되면 상대와 통신할 수 있는 네트워크 Candiate를 찾기 시작한다.
11. 상대의 addIceCandidate()로 설정한다.
12. 서로가 IceCandidate를 교환하면 onAddStream을 통해 Caller의 스트림을 받아올 수 있다. 

### 시그널링
다른곳에서 논의한 것처럼 서로 다른 네트워크에 있는 2개의 디바이스들을 서로 위치시키기 위해서는, 각 디바이스들의 위치를 발견하는 방법과 미디어 포맷 협의가 필요하다. 이 프로세스를 시그널링signalling이라 부르고 각 디바이스들을 상호간에 동의된 서버(socket.io 혹은 websocket을 이용한 서버)에 연결시킨다. 이 서버는 각 디바이스들이 negotiation(협의) 메세지들을 교환할 수 있도록 한다. 

#### 시그널링 서버
두 디바이스들 사이에 WebRTC 커넥션을 만들기 위해, 인터넷 네트워크에서 그 둘을 연결 시키는 작업을 해줄 signaling server가 필요하다. 
* 시그널링 서버는 시그널링 데이터 내용을 몰라도 된다. (SDP) 메세지의 내용들은 시그널링 서버를 통해 상대편으로 가기만 하면 된다. 
* ICE subsystem이 신호 데이터를 다른 피어에게 보내도록 지시하면, 다른 피어는 이 정보를 수신하여 자체 ICE subsystem에 전달하는 방법을 있다. 
1. chat server는 클라이언트와 서버 사이에 Websocket API를 통해 JSON string으로 데이터를 전송한다.
2. 서버는 새로운 유저를 등록하는 것, username을 세팅하는것, 채팅 메세지를 전송하는것 등등의 작업들을 하기 위해 다양한 메세지 타입들을 다룬다. 
3. 시그널링과 ICE negotiation을 서버가 처리하기 위해서 코드를 작성해야 한다. 
4. 모든 로그인된 유저들에게 브로드캐스팅하는 것이 아니라, 특정한 유저에게 직접 메세지를 전달해야 한다. 
5. 서버가 따로 처리할 필요 없이, 수신된 원하지 않는 메세지 타입들을 처리한다. 
6. 여러 서버를 만들 필요없이 동일한 서버를 이용하여 시그널 메시지를 보낼 수 있다. 

#### RTCTrackEvent
WebRTC API 인터페이스의 RTTrackEvent는 RTCPeerConnection의 일부인 RTCRtpReceiver에 새 MediaStreamTrack이 추가될 때 전송되는 트랙 이벤트를 나타낸다.
출처 : https://developer.mozilla.org/en-US/docs/Web/API/RTCTrackEvent

#### RTCRtpTransceiver.direction
![image](https://user-images.githubusercontent.com/12015609/209905544-8d95bc04-9655-47ff-a4bb-3067bbc0011f.png)
사진출처 : https://developer.mozilla.org/en-US/docs/Web/API/RTCRtpTransceiver/direction

## 용어 설명
### RTCPeerConnection.createOffer()
원격 피어에 대한 새 WebRTC 연결을 시작하기 위해 SDP를 생성한다. SDP 제안에는 WebRTC 세션에 이미 첨부된 객체, 코덱, 브라우저에서 지원하는 옵션, ICE가 이미 수집한 정보가 포함되어 있다. 연결하거나 기존 연결의 구성을 업데이트한다. 

### SDP (Session DEscription Protocol)
피어 투 피어 연결을 설명하는 표준, 오디오 및 비디오의 코덱, 소스 주소 및 타이밍 정보가 포함.

### ICE candidate (Interactive Connectivity Establishment)
네트워크 토폴로지(일반적으로 오디오 및 비디오 채팅)에 관계없이 두 피어를 연결하기 위해 사용하는 프레임워크.
이 프로토콜을 사용하면 두 피어가 NAT를 사용하여 각자의 로컬 네트워크에 있는 다른 장치와 글로벌 IP주소를 공유하더라도 서로 연결을 찾고 설정할 수 있다. 프레임워크 알고리즘은 두 피어를 연결하기위해 대기 시간이 가장 짧은 경로를 찾고 다음 옵션을 순서대로 시도한다.

### STURN, TURN
시그널링 메시지에는 ICE 후보인 STURN/TURN서버 주소가 포함, WebRTC는 P2P 방식으로 작동하도록 설계되었기 때문에 사용자는 가능한 한 직접적으로 연결되어야 한다. 따라서 NAT게이트웨이, 방화벽을 넘을 방법을 찾아야 하고 이러한 시도가 실패할 경우 직접적인 연결에 실해한 것으로 간주하여중개 서버로 연결된다. 
WebSocket API는 STUN(Session Trabersal Utilities for NAT) 서버를 사용하여 컴퓨터 IP를 얻으며, 직접적인 연결에 실패한 경우 TURN(Traversal Using Relay around NAT) 서버를 사용하여 통신을 중개한다. 

### TCP/UDP
![image](https://user-images.githubusercontent.com/12015609/209640329-f37c4eed-c9cb-4767-b489-adfcc7e92e68.png) 
이미지 출처 : https://mangkyu.tistory.com/15

### SCTP
스트림 제어 전송 프로토콜(SCTP)은 데이터의 안정적인 시퀀스 전송을 보장하는 전송 계층 프로토콜. SCTP는 하나의 단말 장치 또는 두 단말 장치에서 두 개 이상의 IP 주소로 구성되는 멀티호밍(multihoming) 지원을 제공.
출처 : 구글 

##### 참고사이트 
- https://velog.io/@skyni/WebRTC%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A0%95%EB%A6%AC
- 알고리즘 : https://dareun.github.io/webRTC%E1%84%85%E1%85%B3%E1%86%AF-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB-%E1%84%92%E1%85%AA%E1%84%89%E1%85%A1%E1%86%BC%E1%84%92%E1%85%AC%E1%84%8B%E1%85%B4-%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF
- 시그널링 : https://developer.mozilla.org/ko/docs/Web/API/WebRTC_API/Signaling_and_video_calling
- SDP : https://developer.mozilla.org/en-US/docs/Glossary/SDP
- createOffer : https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createOffer
- CanvasCaptureMediaStreamTrack : https://developer.mozilla.org/en-US/docs/Web/API/CanvasCaptureMediaStreamTrack
- stun, turn : https://roomedia.tistory.com/entry/WebRTC-RTCPeerConnection-RealTime-P2P-Communication
- ICE : https://developer.mozilla.org/en-US/docs/Glossary/ICE
- Codec : https://developer.mozilla.org/en-US/docs/Web/Media/Formats/WebRTC_codecs

본 콘텐츠를 무단으로 복사 후 게재 혹은 배포할 시 저작권법에 의거하여 처벌받을 수 있음을 명시합니다. <br/>
Copyright © sorie lala

