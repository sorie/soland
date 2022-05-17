
# Audio 
개요 : Web Audio API가 처음 브라우저에 소개되었을 때, 이것은 실시간으로 오디오를 조작하는 사용자 정의 오디오 프로세서를 생성하기 위해 JavaScript 코드를 사용하고 있었다. 

- 참고 문헌 : https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API/Using_AudioWorklet

## 오디오 worklet 프로세서의 구조
오디오 worklet 프로세서는 다음을 포함하는 JavaScript 모듈입니다:

- 오디오 프로세서를 정의하는 JavaScript 클래스. 이 클래스는 AudioWorkletProcessor 클래스를 상속받습니다(extends).
- 오디오 프로세서는 반드시 process() 메서드를 구현해야 하는데, 이 메서드는 들어오는 오디오 데이터를 받고 프로세서에 의해 조작된 데이터를 출력에 넣습니다.
- 이 모듈은 registerProcessor()를 호출함으로써 새로운 오디오 worklet 프로세서를 등록하는데, 등록할 때 오디오 프로세서의 이름과 프로세서를 정의하는 클래스를 인자로 전달합니다.

## BaseAudioContext.createScriptProcessor()
더이상 사용되지 않고 있다.
- createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)
- bufferSize : 샘플 프레임 단위의 버퍼 크기. 

<b>"지정된 경우 bufferSize는 다음 값 중 하나여야 합니다. 256, 512, 1024, 2048, 4096, 8192, 16384. 전달되지 않거나 값이 0이면 구현에서 최적의 버퍼 크기를 선택합니다. 주어진 환경은 노드의 수명 동안 2의 일정한 거듭제곱이 됩니다.
이 값은 이벤트가 전달되는 빈도 audioprocess와 각 호출을 처리해야 하는 샘플 프레임 수를 제어합니다. 에 대한 값 bufferSize이 낮을수록 지연 시간이 줄어듭니다(더 나은). 오디오 끊김 및 결함을 방지하려면 더 높은 값이 필요합니다. 작성자는 이 버퍼 크기를 지정하지 않고 구현에서 대기 시간과 오디오 품질 간의 균형을 유지하기 위해 적절한 버퍼 크기를 선택하도록 허용하는 것이 좋습니다." </b>- https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor

## ScriptProcessorNode deprecated 경고
배경 : Javascript에서 사용자 정의 오디오 처리를 활성화하기 위해 Web Audio API는 이벤트 핸들러를 사용하여 기본 UI스레드에서 사용자 스크립트를 호출하는 ScriptProcessorNode가 나왔는데
두가지 문제가 있다.
1. 이벤트 처리는 기본적으로 동기식이어서 대기 시간을 유도한다
2. 메인 스레드에서 실행되기 때문에 실행을 마치기 전까지 다른 모든 동작을 막는다. 코드 실행은 기본 스레드에서 발생하여 다양한 UI 및 DOM 관련 작업으로 일반적으로 혼잡한 메인 스레드에 압력을 가하여 UI가 버벅거리거나 오디오가 글리치를 발생 시킨다.
이런 문제사항으로 ScriptProcessorNode는 사용되지 않고 AudioWorklet으로 대체 되었다.

참고: https://developer.chrome.com/blog/audio-worklet/

## Audio Worklet
오디오 처리하기 위해 메인 스레드를 사용하지 않고 오디오 처리 스레드 내에서 사용자 제공 Javascript코드를 모두 잘 유지 한다. 
즉, 사용자 제공 스크립트 코드가 다른 내장 AudioNode와 함께 오디오 렌더링 스레드(AudioWorkletGlobalScope)에서 실행되어 추가 대기 시간 및 동기 렌더링를 보장한다.
<br>

"오디오 컨텍스트의 오디오 worklet은 메인 스레드에서 떨어져 실행되는 Worklet (en-US)인데, 이는 컨텍스트의 audioWorklet.addModule() (en-US) 메서드를 호출함으로써 이 worklet에 추가된 오디오 프로세싱 코드를 실행합니다. addModule()을 호출하면 명시된 JavaScript 파일을 로드하는데, 이 파일은 오디오 프로세서의 구현을 포함하고 있어야 합니다. 프로세서가 등록되었다면 여러분은 새로운 AudioWorkletNode를 생성할 수 있고, 이 노드가 다른 오디오 노드들과 함게 오디오 노드의 체인에 연결되었을 때 이 노드는 프로세서의 코드를 통해 오디오를 전달합니다." - https://developer.mozilla.org/ko/docs/Web/API/Web_Audio_API/Using_AudioWorklet

<br>
![image](https://user-images.githubusercontent.com/12015609/167522025-6e6b0aa0-ac77-4beb-b493-e4480d0cd521.png)

1. AudioWorkletProcessor : Javascript 코드로 작성된 실제 오디오 프로세서, AudioWorkletGlobalScope에 있다.
2. AudioWorkletNode : AudioWorkletProcessor의 대응물이며 메인 스레드의 다른 AudioNode와의 연결을 처리한다. 주요 전역 범위에 노출되고 일반 AudioNode와 같은 기능을 한다.

- Audio Worklet을 포함한 Worklet API는 보안 컨텍스트 에서만 사용할 수 있으므로 이를 사용하는 페이지는 
HTTPS를 통해 제공되어야 하지만 http://localhost 로컬 테스트에서는 안전한 것으로 간주됩니다.
- AudioWorkletNode를 하위 클래스로 분류하여 worklet에서 실행 중인 프로세서가 지원하는 사용자 지정 노드를 정의할 수 있다.
- registerProcessor() AudioWorkletGlobalScope의 메서드는 등록할 프로세서 이름과 클래스 정의에 대한 문자열을 사용한다.
- 전역 범위에서 스크립트 코드 평가가 완료되면 `AudioWorklet.addModule()` 으로부터 기본 전역 범위에서 클래스 정의를 사용할 준비가 되었음을 사용자에게 알린다.
- AudioNodes에 대한 유용한 것 중 하나는 AudioParams를 사용한 예약 가능한 매개변수 자동화이다.
- AudioWorkletNodes는 오디오 속도에서 자동으로 제어할 수 있는 노출된 매개변수를 얻을 수 있다. 
- 사용자 정의 AudioParams는 AudioParamDesciptors세트를 설정하여 AudioWorkletProcessor클래스 정의에서 선언 할 수 있다.
- 기본 WebAudio 엔진은 AudioWorkletNode 생성 시 AudioParam 개체를 만들고 노드에 연결한다.
- 실제 오디오 처리 process()는 AudioWorkletProcessor의 콜백 메서드에서 발생하며 클래스 정의에서 사용자가 구현해야 한다.
- WebAudio 엔진은 process()를 동시성 방식으로 호출하여 입력 및 매개변수를 제공하고 출력한다.
- process()메서드의 변환 값을 사용하여 개발자가 메모리 공간을 관리할 수 잇도록 AudioWorkletNode의 수명을 제어할 수 잇다.
- `process()메소드에서 false를 리턴하면 프로세서가 비활성 상태로 표시되고 WebAudio 엔진은 더 이상 메소드를 호출하지 않는다. `
프로세서를 활성 상태로 유지하려면 메서드가 true로 반환해야 한다. 그렇지 않으면 노드/프로세서는 결국 시스템에 의해 기비지를 수집한다. 
- `MessagePort는 AudioWorkletNode 및 AudioWorkletProcessor에서 양방향 통신기능을 한다.` 이 채널을 통해 모든 종류의 맞춤 데이터를 교환 할 수 있다.
- MessagePort는 .port노드와 프로세서 모두의 속성을 통해 액세스할 수 있다. 
- 노드의 port.postMessage() 방법은 관련 프로세서의 port.onmessage 핸들러에 메시지를 양방향으로 보낼 수 있다.
- MessagePort는 Transferable을 지원하므로 스레드 경계를 통해 데이터 저장소 또는 WASM모듈을 전송할 수 있다. 
<br/>

![image](https://user-images.githubusercontent.com/12015609/167545354-d5b648cf-872a-484c-a597-9729508cdb93.png)

- 이모든 기능을 합친것이 GainNode이다. 

## AudioWorkletProcessor.process
AudioWorkletProcessor에서 파생된 클래스의 process() 메서드는 오디오 프로세서 worklet에 대한 오디오 프로세싱 알고리즘을 구현.
- https://developer.mozilla.org/ko/docs/Web/API/AudioWorkletProcessor/process

##### 현재 Audio Worklet은 Chrome 66 이상에서 기본적으로 활성화되어 있다. Chrome 64 및 65에서 이 기능은 안정화 되지 않았다.








