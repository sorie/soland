MDN의 WebRTC 문서에서는 WebRTC를 다음과 같이 정의

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




##### 참고사이트 
- https://velog.io/@skyni/WebRTC%EC%97%90-%EB%8C%80%ED%95%9C-%EC%A0%95%EB%A6%AC




