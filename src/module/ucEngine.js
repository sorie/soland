 


(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({35:[function(require,module,exports){
	function GlobalFunctions(){
		let global = {};
	
		global.db = null;
		// global.debug_mode = true;
		global.debug_mode = false;
		global.secret = "";
		global.osname = "web";
		global.appVersion = "1.0.0";
		global.correctionTime = 0;

		////////////////////////////////////////////////////////////////////////////
		/// LOG
		global.debug = function(s){
			if(global.debug_mode){
				var timeString = new Date(new Date() - global.correctionTime).toISOString();
				console.debug("[" + timeString +"] " + s);
				timeString = null;
			}
		};
	
		global.info = function(s){
			if(global.debug_mode){
				var timeString = new Date(new Date() - global.correctionTime).toISOString();
				console.info("[" + timeString +"] " + s);
				timeString = null;
			}
		};
	
		global.error = function(s){
			var timeString = new Date(new Date() - global.correctionTime).toISOString();
			console.error("[" + timeString +"] " + s);
			timeString = null;
			// if(global.debug_mode){
			//     var timeString = new Date(new Date() - global.correctionTime).toISOString();
			//     console.error("[" + timeString +"] " + s);
			//     timeString = null;
			// }
    };

    global.transStrToObj = function(str){
			var object = {};
			try{
				if(typeof str == 'string'){
					object = JSON.parse(str.replace(/'/g, '\"'));
				}
				else{
					object = str;
				}
			}
			catch(error){
				global.error('transStrToObj error=' + error);
			}
	
			return object;
		};
    
		global.transObjToStr = function(obj){
			if(obj!=null){
				try{
				if(typeof obj == 'object'){
					var value = JSON.stringify(obj);
					value = value.replace(/"/g, '\'');
					return value;
				}
				else{
					return obj;
				}
				}
				catch(error){
					global.error('transObjToStr error=' + error);
					return '';
				}
			}
			return '';
		};
	
		return global;
	}
	
	module.exports = GlobalFunctions;
	
	},{}],36:[function(require,module,exports){
	function UcText(currentLanguage, appName) {
	
		  //주의사항: text가 무분별하게 겹치지 않도록 잘 관리할 것.
	
		  //kr or en or etc...
		  var index = 0;
		  switch(currentLanguage){
				case 'en': case 'en-US':  index = 0;  break;
				case 'ko': case 'ko-KR': case 'ko-kr': index = 1;  break;
				case 'zh-CN': 			 	index = 2;  break;	//간체
				case 'zh-TW': case 'zh-HK':	index = 3;  break;	//번체
				default: 	index = 0;  break;
		  }
	
		  var localeText = {
				title: {
					/*logo */
					himartLogoFile : ['../img/video/himartLogo_en.svg','../img/video/himartLogo_ko.svg'],

					/*main start */
					gridview : ['Grid View', '격자뷰'],
					speakerview : ['Speaker View', '스피커뷰'],	
					/* main end */

					notes: ['Notes','노트'],
					textbook: ['Textbook','교재'],

					/* 화상면접방 입장 화면(PC) start */
					beforeyoustart: ['Before you start', '화상방 입장 설정'],
					yourname: ['What’s your name?', '이름을 넣어주세요.'],
					camera: ['Camera', '카메라'],
					cameraon: ['On', '켜기'],
					cameraoff: ['Off', '끄기'],
					micon: ['On', '켜기'],
					micoff: ['Off', '끄기'],
					microphone: ['Microphone', '마이크'],
					entermeeting: ['Enter meeting', '화상방에 입장하기'],
					/* 화상면접방 입장 화면(PC) end */

					
					/* 세팅메뉴 클릭 시  start */
					roomSettings: ['Room Settings', '화상방 설정하기'],
					audioVideo: ['Audio & Video', '오디오 & 비디오'],
					videoQuality: ['Video quality', '비디오 화질'],
					high: ['High', '높음'],
					low: ['Low', '낮음'],
					saveSettings: ['Save settings', '저장하기'],
					done: ['Done', '설정 완료'],
					displayName: ['Display name', '이름 수정'],
					participantsList: ['Participants list', '참여자 리스트'],
					manageGuests: ['Manage guests','게스트 설정'],
					meetingRoom: ['Meeting room','잠금설정'],
					needToKnock: ['Guests need to knock to enter.','게스트들이 들어오려면 노크필요.'],
					lock: ['LOCK','잠금'],
					unlock: ['UNLOCK','잠금해제'],
					removeAll: ['Remove all','전체내보내기'],
					muteAll: ['Mute all','전체음소거'],
					someoneIsKnocking: ['Someone is knocking','노트알림'],
					/* 세팅메뉴 클릭 시  end */

					/* 화상면접방 입장 완료 후 공유하기 버튼 눌렀을 때 start */
					screenshare: ['Screen Share', '화면공유'],
					whiteboard: ['Whiteboard', '필기내용공유'],
					youtube: ['Youtube', '동영상주소공유'],
					document: ['document', '파일공유'],
					shareVideo: ['Share video','화면공유'],
					streamYoutubeVideo: ['Stream youtube video','스트림유튜브동영상'],
					pasteUrl: ['Paste the youtube url video here','여기에 유튜브URL 붙여넣기'],
					annotate: ['Annotate','필기하기'],
					youaresharingyourscreen: ['You are sharing your screen','화면을 공유하는 중'],

					/* 화상면접방 입장 완료 후 공유하기 버튼 눌렀을 때 end */

					


					categorizeYourNotes: ['Categorize your notes', '노트분류'],
					idea: ['Idea', '아이디어'],
					calendar: ['Calendar', '달력'],
					money: ['Money', '비용'],
					question: ['Question', '질문'],
					favorites: ['Favorites', '즐겨찾기'],
					  favoritesEdit: ['Edit Favorites', '즐겨찾기 편집'],
					  chats: ['Chats', '대화'],
					  editChats: ['Edit Chats', '대화 편집'],
					  searchChats: ['Search Chats', '대화 검색'],
					  contacts: ['Contacts', '연락처'],
					  groups: ['Groups', '그룹'],
					  addToNewGroup: ['Add to New Group', '새 그룹 생성'],  /* yj*/
					  groupsByYou: ['Groups by you', '내가 만든 그룹'],  /* yj*/
					  createNewChannel: ['Create a New Board', '새 보드 만들기'],  /* yj web:modified*/
					  searchPublicBoard: ['Search a Public Board', '공개보드 검색하기'],
					  createNewConference: ['Create New Conference', '새 영상회의 생성'],  /* yj*/
					  scheduleConference: ['Schedule a Conference', '영상회의 시작하기'],
					  editConference: ['Edit a Conference', '영상회의 편집'],  /* yj web:modified*/
					  more: ['More', '설정'],
					  websearch: ['Search', '직원검색'],
					  websearchUser: ['Search', '사용자검색'],
					  security: ['Security','보안카메라'],
	
					  channel: ['Board', '보드'],  /* yj*/
					  myChannel: ['My Board', '내 보드'],  /* yj*/
					  allChannel: ['All Board', '모든 보드'],  /* yj*/
					  board: ['Board', '보드'],
					  post: ['Post', '게시물'],
					  searchBoard: ['Search Board', '보드 검색'],
					  choose: ['Choose', '선택'],
					  chooseInvite: ['Choose For Invite', '초대할 상대 선택'],
					  chooseChat: ['Choose For Chat', '대화 상대 선택'],
					  chooseMember: ['Choose For Add', '추가할 멤버 선택'],
					  chooseForward: ['Choose For Forward', '전달할 상대 선택'],
					  chooseForwardToRoom: ['Choose For Forward', '전달할 대화방 선택'],
	
					  /* board create */
					  purpose: ['Purpose', '목적'],
					  sendInviteTo: ['Send invites to', '초대 할 사람'],
					  optional: ['Optional', '옵션'],
	
					  /* new chat */
					  createNewChat: ['Create a new chat', '새로운 대화 시작하기'],
					  chatRoomName: ['Group chat name', '그룹 대화방 이름'],
	
					  chooseNewChat: ['New Chat', '새 대화'],
					  chooseSendNote: ['Send Note', '쪽지 전송'],
					  conference: ['Conference', '영상회의'], /* yj*/
					  general: ['General', '일반'],  /* yj*/
					  delete: ['Delete', '삭제'],  /* yj*/
					  email: ['E-Mail', '이메일'], /* yj*/
					  phone: ['Phone', ' 휴대전화'], /* yj*/
					  workTel: ['Work Tel', '회사전화'], /* yj*/
					  leaveConference : ['Are you sure to leave this conference?','영상통화 종료'],
	
					  info: ['Info', '연락처 정보'],
					  usrPrtInfo: ['User Group Info', '사용자 그룹 정보'],
					  depPrtInfo: ['Company Group Info', '조직도 그룹 정보'],
	
					  notification: ['Notification', '알림'],
					  profile: ['Profile', '프로필'],
					  people: ['People', '연락처'],
					  setTheme: ['Set Theme', '테마 설정'],
					  setChatFont: ['Set Chat Font', '대화방 폰트 설정'],
					  setNotification: ['Set Notification', '알림 설정'],
					  setPasscodeLock: ['Set Passcode Lock', '암호 잠금 설정'],
					  photos: ['Photos', '사진'],
					  videos: ['Videos', '동영상'],
					  allFileType: ['All File Type', '파일 형태'],/* yj*/
					  images: ['Images', '이미지'],/* yj*/
					  image: ['Image', '이미지'],/* yj*/
					  audios: ['Audios', '오디오'],/* yj*/
					  pdf: ['PDF', 'PDF'],/* yj*/
					  doc: ['DOC', 'DOC'],/* yj*/
					  etc: ['ETC', 'ETC'],/* yj*/
	
					  addToFavorites: ['Add to Favorites', '즐겨찾기 추가'],
					  bookmarkList: ['Bookmark List', '북마크 리스트'],
					  channelList: ['Board List', '보드 목록'],
	
					  addToNewGroup: ['Add to New Group', '그룹 추가'],
					  viewImageVideo: ['View Image/Video', '이미지/동영상'],
					  checkReceiveMessage: ['Check Receive Message', '메세지 수신 확인'],
	
					  bookmark: ['Bookmark', '북마크'],
					  logout: ['Logout', '로그아웃'],
					  inviteFriens: ['Invite Friends', '친구 초대'],
					  checkUnreadMessage: ['Unread Message', '안 읽은 메시지'],
	
					  members:['Members', '구성원'],
					  newVersion:['Download New Version', '새 버전 받기'],
					  confirmUseApp:['Usage agreement', '프로그램 사용 동의'],
					  signUp:['Sign up', '회원가입'],
					  signOut:['Sign out', '로그아웃'],
	
					  error: ['Error', '오류발생'],
					  dialUp: ['Dial Up', '전화걸기'],
	
					  moreConfiguration: ['Configuration', '설정'],
					  setting: ['Setting', '설정'], /* yj*/
					  moreTool: ['Tool', '기능'],
					  moreAbout: ['About', '정보'],
					  sendMail: ['Send E-mail', '이메일 전송'],
					  imageSendMail: ['Send image to E-mail', '사진 이메일 전송'],
					  videoSendMail: ['Send video to E-mail', '동영상 이메일 전송'],
	
					  alwayson: ['Always-on mode', '상시접속모드'],
					  noticeAlwayson: ['Usage agreement of Always-On', '상시접속모드 사용동의'],
	
					  integratedAlbum: ['Image album', '통합 앨범'],
					  cameraAlbum: ['Camera album', '촬영 앨범'],
					  chatRoomAlbum: ['Chatting album', '대화방 앨범'],
					  searchResults: ['Search Results', '검색 결과'],  /* yj*/
					  hideOff: ['Hide Off', '숨기기해제'],
					  hideOn: ['Hide On', '숨기기설정'],
					  forgetPassword: ['Forget Password', '패스워드 분실'],/* yj*/
	
					  name: ['Name', '이름'], /* yj*/
					  access: ['Access', '접근방법'], /* yj*/
					  public: ['Public', '공개'], /* yj*/
					  private: ['Private', '비공개'], /* yj*/
					  deleteThisChannel: ['Delete This Board', '보드 삭제'], /* yj*/
					  leaveThisChannel: ['Leave this Board', '보드 구독 해지'], /* yj*/
					  deleteThisConference: ['Delete This conference', '영상회의 삭제'], /* yj*/
					  end: ['END', 'END'], /* yj*/
					  on: ['ON', 'ON'], /* yj*/
					  scheduled: ['Scheduled', 'Scheduled'], /* yj*/
					  recordThisConference :  ['Record this conference?', '영상회의를 녹화 하시겠습니까?'],/* yj */
					  description :  ['Description', '설명'],/* yj */
					  title :  ['Title', '제목'],/* yj */
					  time :  ['Time', '시간'],/* yj */
					  attachment :  ['Attachment', '첨부파일'],/* yj */
					  addAttachment :  ['Add attachment', '첨부파일'],
					  record :  ['Record', '녹화'],/* yj */
					  deletePicture : ['Delete this profile picture?', '프로필 사진 삭제 하시겠습니가?'],/* yj */
					  account : ['Account', '계정정보'],/* yj */
					  about : ['About', '정보'],/* yj */
					  version : ['Version','버전'],/* yj */
					  privacyPolicy : ['Privacy Policy','개인정보보호정책'],/* yj */
					  termsofuse : ['Terms of Use', '이용약관'],/* yj */
					  department : ['Department','부서'],/* yj */
					  name : ['Name','이름'],/* yj */
					  picture : ['Picture','사진'],/* yj */
					  jobTitle : ['Job title','직위'],/* yj */
					  password : ['Password','비밀번호'],/* yj */
					  current : ['Current','현재비밀번호'],/* yj */
					  new: ['New','신규비밀번호'],/* yj */
					  reTypeNew: ['Re-Type New','신규비밀번호확인'],/* yj */
					  work: ['Work','회사'],/* yj */
					  allowNotifications : ['Allow Notifications','메세지 알림 허용'],/* yj */
					  groupChatNotification : ['Group Chat Notification','그룹방 메세지 알림 허용'],/* yj */
					  pushOption : ['Enable this option to receive push notifications from a new group chat.','신규 생성된 그룹의 메세지에 대한 알림을 수신 할 수 있습니다.'],  /* yj */
	
					  readAll: ['Read all', '모두 읽음'],
					  titleLaboratory : ['You can discuss and communicate over specific topic or issue in BOARD.','보드는 프로젝트와 같은 특정 주제를 중심으로 동료간에 공유할 수 있는 커뮤니티 입니다.'],
					  descriptionLaboratory : ['To start using BOARD, first set BOARD ON and refresh webpage.', '보드 사용을 원하시면 켜짐을 선택 후, 웹 페이지를 새로고침 하셔야 합니다.'],
	
	
					  file: ['File', '파일'],
					  filename:['File Name: ', '파일 이름: '],
					  fileUpload:['File Upload', '파일 업로드'],
					  addToNewConf: ['Add Conference', '영상회의 추가'],
					  newConfReservationName : ['Title','회의 제목'],
					  newConfReservationDesc : ['Description','상세 설명'],
					  newConfReservationDate : ['Date','회의 날짜'],
					  newConfReservationDuringT : ['Duration','회의 시간'],
					  newConfReservationTimeZone : ['Timezone','시간대 선택'],
	
					  LocalTime:['Local Time', '사용자기준 시간'],
					  TimeZone:['Time Zone', '현지시간 기준'],
	
					  unknownUser : ['Unknown User','사용자정보없음'],
					  warning: ['Warning', '경고'],
	
					  sendImage: ['Send Image', '사진 전송'],
					  sendVideo: ['Send Video', '동영상 전송'],
	
					  deleteContact: ['Delete Contact', '연락처 삭제'],
	
					  pushAnyKind: ['Activity of Any Kind', '모든 활동'],
					  pushOnlyPost: ['Only Post', '게시글만'],
					  pushInvolvedComments: ['Involved Comments', '게시글과 댓글까지'],
					  pushNothing: ['Nothing (Push Notification Off)', '푸시알림 없음'],
					  pushBoardChat: ['Chat Push Notifications', '보드 대화방 알림'],
	
					  inviteFromRoundee: ['Invite from Roundee', 'roundee 친구 초대하기'],
					  inviteFromAddress: ['Invite from Address Book', '주소록에서 초대하기'],
					  leaveBoard: ['Leave the Board', '보드에서 나가기'],
					  type: ['type', '종류'],
					  publicBoardDesc: ['Anyone can join this Board and invite others.', '누구든지 이 방에 참여할 수 있습니다.'],
					  privateBoardDesc: ['Only people invited to this Board may join.', '초대된 친구만 참여할 수 있습니다.'],
					  createBoard: ['Create a Board', '보드 생성'],
					  writePost: ['Write Post', '게시글 쓰기'],
					  whatWorking: ['what are you working on?', '게시글을 작성하세요.'],
	
					  news: ['News', '새소식'],
	
					  laboratory: ['Laboratory', '실험실'],
					  participant: ['Participant', '참여자'],
	
					  groupName: ['Group Name', "그룹 이름"],
				},
	
				data:{
					  mobile:['Mobile', '휴대전화'],
					  tel:['Tel', '지정번호'],
					  ext:['Ext', '내선번호'],
					  corpTel:['CorpTel', '회사번호'],
					  fax:['Fax', '팩스'],
				},
	
				button: {
					/* bottom-menu start */
                    invite:['Invite', '초대하기'],
                    videooff:['Video off', '화면끄기'],
                    videoon:['Video on', '화면켜기'],
                    micoff:['Mic off', '마이크끄기'],
                    micon:['Mic on', '마이크켜기'],
                    sharestart:['Share', '공유하기'],
                    sharestop:['Stop Sharing', '공유중지'],
                    rec:['Rec', '녹화'],
                    chat:['Chat', '대화하기'],
                    invite:['Invite', '초대하기'],
                    settings:['Settings', '설정하기'],
                    leave:['Leave', '화상종료'],
					/* bottom-menu end */
					
					  contacts: ['Contacts', '연락처'],
					  groups: ['Groups', '그룹'],
					  chats: ['Chats', '대화'],
					  addPeople: ['Add People', '사용자 추가'],/* yj*/
					  addToFavorites: ['Add to Favorites', '즐겨찾기 추가'],/* yj*/
					  removeFromFavorites: ['Remove From Favorites', '즐겨찾기 삭제'],/* yj*/
					  ok: ['OK', '확인'],
					  cancel: ['Cancel', '취소'],
					  next: ['Next', '다음'],
					  end :['End','종료'],
					  use: ['Use', '사용'],
					  notUse: ['Not use', '사용안함'],
	
					  back: ['Back', '이전'],
					  edit: ['Edit', '편집'],
					  newChat: ['New', '새 대화'],
					  newGroup: ['New', '새 그룹'],
					  newChat_Web: ['New Chat', '새 대화'],
					  newGroup_Web: ['New Group', '새 그룹'],
	
	
					  newChannel: ['New Board', '새 보드'],  /* yj*/
					  newConference: ['New Conference', '새 영상회의'],  /* yj*/
					  deleteChannel: ['Delete Board', '보드 삭제'],  /* yj*/
					  subscribeChannel: ['Subscribe Board', '보드 구독'],  /* yj*/
					  leaveChannel: ['Leave Board', '보드 구독 해지'],  /* yj*/
					  subscribe: ['Subscribe', '구독합니다.'],  /* yj*/
					  noSubscribe: ['No', '구독하지 않습니다.'],  /* yj*/
					  comment:['Comment', '댓글'],  /* yj*/
					  comments:['Comments', '댓글'],  /* yj*/
					  newboardstories:['new stories', '새로운 소식'],  /* yj*/
	
					  new: ['New', '추가'],
					  add: ['Add', '추가'],
					  create: ['Create', '생성'],  /* yj*/
					  delete: ['Delete', '삭제'],  /* yj*/
					  fileName: ['File name', '파일명'],  /* yj*/
					  files: ['Files', '파일'],  /* yj*/
					  post: ['Post', 'Post'],  /* yj*/
					  time: ['Time', '시간'],  /* yj*/
					  allFileTypes: ['All File Types', '모든 파일 형태'],  /* yj web:modified*/
					  all: ['All', '전체'], /* web */
					  sentIn: ['Sent In', '작성된 곳'], /* web */
					  sentBy: ['Sent By', '작성자'], /* web */
					  postIn: ['Post In', '작성된 곳'], /* web */
					  postBy: ['Post By', '작성자'], /* web */
					  sharedIn: ['Shared In', '공유된 곳'], /* web */
					  sharedBy: ['Shared By', '공유한 사람'], /* web */
	
					  done: ['Done', '완료'],
					  leave: ['Leave', '나가기'],
					  send: ['Send', '전송'],
					  login: ['Log In', '접속'],
					  signin: ['Sign in', '접속'],
					  logout: ['Log Out', '접속해제'],
					  chat: ['Chat', '대화시작'],
					  chat2: ['Chat', '대화'],
					  download: ['Download', '다운로드'],  /* yj*/
					  startConference: ['Start Conference', '영상통화 시작'],  /* yj*/
					  email: ['E-Mail', '이메일'],
					  sendAnEmail: ['Send an email', '이메일 보내기'],  /* yj*/
					  tempMember: ['Extra Features', '추가기능'],
					  addMember: ['Add Member', '멤버 추가'],
					  deleteMember: ['Delete Member', '멤버 삭제'],
					  deleteGroup: ['Delete Group', '그룹 삭제'],
					  deleteConversation: ['Delete Conversation', '대화 삭제'], /* yj*/
					  deleteMessage: ['Delete Message', '메시지 삭제'], /* yj*/
					  profile: ['Profile', '프로필보기'],  /* yj*/
					  call: ['Call', '전화걸기'],
					  fullScreen: ['Full Screen', '전체화면'],  /* yj*/
					  messages: ['Messages', '메시지'], /* yj*/
					  notification: ['Alarm', '알림'],
					  notification_Web: ['Notifiaction', '알림'],
					  bookmark: ['Bookmark', '북마크'],
					  bookmarkOff: ['Bookmark Off', '북마크 해제'],
					  websearch: ['Search', '직원검색'],
					  search: ['Search', '검색'],
					  invite: ['Invitation', '초대'],
					  hideOn: ['Hide on', '숨기기'],
					  hideOff: ['Hide off', '숨기기해제'],
					  hiddenChat: ['Hidden Chat', '숨김방설정'],  /* yj*/
					  move: ['Move', '이동'],  /* yj*/
					  profile: ['Profile', '프로필보기'],  /* yj*/
					  topOn: ['Top on', '고정방'],
					  topOff: ['Top off', '고정방해제'],
					  viewAll: ['View All', '모아보기'],
					  setChatRoomName: ['Set Chat Room Name', '대화방 이름 설정'],
					  setChatRoomName2: ['Set Chat Room\nName', '대화방\n이름 설정'],
	
					  select: ['Select', '선택'],
					  selectfile: ['Select File', '파일선택'],
					  share: ['Share', '공유'],
					  album: ['Album', '앨범'],
					  changeTheme: ['Change Theme', '테마변경'],
	
					  copy: ['Copy', '복사'],
					  forward: ['Forward', '전달'],
					  forwardToRoom: ['Forward To Room', '대화방으로 전달'],
					  delete: ['Delete', '삭제'],
					  resend: ['Resend', '재전송'],
					  checkReceive: ['Check Receive', '수신 확인'],
					  groupNotice: ['Notice', '공지'],
	
					  imageAlbum: ['Image album', '사진앨범'],
					  capturePhoto: ['Capture photo', '사진찍기'],
					  videoAlbum: ['Video album', '동영상앨범'],
					  captureVideo: ['Capture video', '동영상촬영'],
					  agree:['Agree', '동의'],
					  viewEntireText:['View all', '전체보기'],
	
					  selectOne: ['Select One', '선택'],  /* yj*/
					  invitation: ['Invitation', '초대'],  /* yj*/
					  deleteConversation : ['Delete this Entire Conversation', '대화 삭제'],  /* yj*/
					  conferenceList: ['Conference List', '영상회의 목록'],  /* yj*/
					  noExtension: ['No extension', 'No extension'],  /* yj*/
					  after30Min : ['after 30 min', 'after 30 min'],  /* yj*/
					  startRecording : ['Start Recording', '녹화 시작'],  /* yj*/
					  stopRecording : ['Stop Recording', '녹화 종료'],  /* yj*/
					  addAttachment : ['Add Files', '파일 추가'],  /* yj*/
					  timeZone : ['Time zone', 'Time zone'],  /* yj*/
					  startNow: ['START NOW', '바로 시작'],
	
					  noticeDelete:['Delete', '삭제'],
					  noticeCollapse:['Collapse', '접기'],
	
					  loadingMore:['Loading more', '더 가져오기'],
					  markingRead:['Marking Read', '읽음 처리'],
	
					  close:['Close', '닫기'],
					  open:['Open', '열기'],
	
					  ConferenceEnd:['End','종료'],
					  ConferenceSchedule:['Scheduled', '예약중'],
					  ConferenceInProgress:['InProgress', '진행중'],
					  ConferenceEnter:['Join', '참여'],
	
					  ConferenceCreateImmediately:['Create Now', '즉시 생성'],
	
					  view : ['View', '보기'],
					  save : ['Save', '저장'],
	
					  addProfile: ['Add Profile Picture', '프로파일 사진 추가'],
					  selectFromAlbum: ['Select From Image Album', '사진 앨범에서 선택'],
					  //takePicture: ['Take Picture', '사진 촬영'],
					  deleteProfile: ['Delete Profile', '프로필 삭제'],
	
					  applyAll: ['Apply All', '일괄적용'],
					  batchApply: ['Batch Apply', '일괄 적용'],
	
	
					  fileHistory:['File History', '관련 파일 보기'],
				},
	
				message:{

					addAQuickNote: ['Add a quick note','빠른노트 추가'],
					notemessageone: ['No time to write down?','쓸 시간이 없나요?'],
					blankNote: ['Blank note','빈노트'],
					hit: ['Hit “Alt + N” to leave ','"Alt + N"을 눌러'],
					blanknote: ['blank note and edit later.','빈메모를 남기고 나중에 편집하십시오.'],
					settingsHaveBeenSaved: ['Settings have been saved.','설정이 저장되었습니다.'],
					areYouSureToDeleteThisNote: ['Are you sure to delete this note?','정말 노트를 삭제하시겠습니까?'],
					takeSomePersonalNotes: ['Take some personal notes...','개인 메모를 작성하세요.'],

					noregistered: ['There are no registered files.','등록된 파일이 없습니다.'],
					supportedDocument: ['Supported document','지원되는 문서'],
					selecthere: ['Select here...','검색어를 입력바랍니다.'],

					recordingStarted: ['Recording started','녹화를 시작합니다.'],
					recordingSaved: ['Recording saved.','녹화를 저장되었습니다.'],
					recordingActivated: ['Recording activated.','녹화가 활성화되었습니다.'],
					isRecordingThisConversation: ['is recording this conversation','이/가 녹화를 시작하였습니다.'],
					autoRecordStart: ['Auto recording is start.','자동녹화가 시작됩니다.'],
					recordmessageone: ['Hit <strong> ‘alt+N’ </strong> to leave a blank note and edit later.','‘alt+N’을 치고 빈메모를 남겨 나중에 수정하세요.'],

					recordmessagetwo: ['Access your video recording directly from your dashboard once the meeting end.','미팅이 끝나면 대시보드에서 직접 비디오 녹화를 확인하세요.'],
					recordmessagethree: ['Access your video recording directly from your dashboard and Slack once the meeting end.','미팅이 끝나면 대시보드와 슬랙에서 직접 비디오 녹화를 확인하세요.'],
					

					/* 비공개된 방에 입장할 때 start */
					currentlyLocked: ['This room is currently locked', '본 화상방은 승인 후 입장이 가능합니다.'],
					cameraAhead: ['When the camera is activated, look straight ahead and', '카메라가 활성화되면 정면으로 바라보고'],
					requestAccess: ['knock to request access.', '화상방 입장 승인 요청을 해주세요.'],
					knock: ['Knock', '입장 승인 요청하기'],
					thereIsNobodyIntheRommYet: ['There is nobody in the room yet.', '화상방에 아직 아무도 없습니다.'],
					waintingForReply: ['Waiting for reply...', '응답을 기다려주세요.'],
					pleaseEnterYourName: ['Please enter your name.', '당신의 이름을 입력해주세요.'],
					smileWhenYouknock: ['Smile a video will be taken when you knock.', '카메라가 있는 방향으로 정면을 바라 봐주세요, 입장 승인 요청하기 버튼을 클릭 시 참여자의 카메라를 보고 있는 모습이 전송됩니다. (해당 사진은 입장 승인을 위한 사진이며,입장 완료 후에는 모두 삭제됩니다.)'],

					/* 비공개된 방에 입장할 때 end */

					/* 화상면접방 입장 완료 후 종료 버튼을 클릭했을 때 알림창  start */
					readytoleave: ['Are you ready to leave the meeting?', '화상을 종료하시겠습니까?'],
					noiwannastay: ['No, I want to stay', '아니요, 좀 더 참여하겠습니다.'],//게스트, 호스트모두 해당
					yesleavemeeting: ['Yes, Leave meeting', '네, 화상방을 나가겠습니다.'],//게스트경우
					yesclosemeeting: ['Yes, Close the meeting room', '네, 화상방을 종료하겠습니다.'],//호스트경우
					/* 화상면접방 입장 완료 후 종료 버튼을 클릭했을 때 알림창 end */

					/* kick-user.hbs start */
					doyouWantToDismissAll: ['Do you want to dismiss all attendees from the room?', '회의실에서 모든 참석자를 내보내시겠습니까?'],
					kickUser: ['Do you want to dismiss this person from the room?', '이 사람을 방에서 내보내시겠습니까?'],
					noUserStay: ['No, let him/her stay', '아니요. 내보내지않겠습니다.'],
					yesDismiss: ['Yes, dismiss', '네, 내보내겠습니다.'],
					noTheyStay: ['No, let they stay', '아니요. 내보내지않겠습니다.'],
					/* kick-user.hbs end */
					
					
					/* notification  start */
					novideo: ['no video. Please refresh the page.','비디오가 전송되지 않습니다. 처음 사용하신 url로 재입장해주세요.'],
					noaudio: ['no audio. Please refresh the page.','음성이 전송되지 않습니다. 처음 사용하신 url로 재입장해주세요.'],
					poorConnection: ['Poor connection','네트워크상태가 안좋습니다.'],
					poorConnectionEng: ['Poor connection. Please attend the class again.','네트워크상태가 안좋습니다. 화면을 끄고 다시 수업에 참여해주세요.'],
					notiNowUnlock: ['Your room is now unlocked', '화상방 잠금 설정이 해제 되었습니다.'],
					notiNowLock: ['Your room in now locked. Guest needs to knock to enter', '화상방 잠금 설정이 되었습니다. 참여자가 본 화상방에 입장하기 위해서는 승인이 필요합니다.'],
					notiWannajoin: ['want to join the meeting', '님께서 화상참여를 원합니다.'],
					notiSeewho: ['See who', '노크한사람확인하기'],
					notiAllow: ['Allow', '참여수락하기'],
					notiRejectMsgHere: ['Reject msg here', '수락하지 못하는 이유'],
					notiReject: ['Reject', '참여수락 거절하기'],
					notiSkipToNextPerson: ['Skip to next person', '다음 참여 희망자 확인하기'],
					fiveminleft: ['5 minutes left for video chatting.','면접 종료시간까지 5분 남았습니다.'],
					tenminleft: ['10 minutes left for video chatting.','면접 종료시간까지 10분 남았습니다.'],
					leftthemeeting: [' left the meeting','님이 나갔습니다.'],
					jointhemeeting: [' joined the meeting','님이 들어왔습니다.'],
					recording: ['Recording...','녹화중...'],
					stoppedTheRecording: [' stopped the recording.','님께서 녹화를 중지하였습니다.'],
					wouldLikeToEnterInto: [' would like to enter into your meeting room.','이/가 방에 입장하려고 합니다.'],
					sessiontimeout: ['Session timeout','안내말씀'],
					yoursession: ['Free customers are limited to 30 minutes of total time.','무료고객은 전체화상시간 30분으로 제한됩니다.'],
					/* notification end */

					/* invite message  start */
					linkcopied: ['Link copied! - Paste and send anywhere','복사완료! - 붙여놓고 어디든 보내세요.'],
					linkcopyandsend: ['Please click the copy button and send the link to Kakao Talk','복사버튼을 클릭하신후 카카오톡으로 링크를 전달해주세요.'],
					linkcopyandsendEx: ['Ex. Copying a link to one or several people after copying.','예시) 복사 후 한명 혹은 여러명에게 복사한 링크 전달.'],
					inviteByEmail: ['Invite by email','이메일로 초대하기'],
					allowpeople: [' people are allowed in','명 입장가능'],
					emailGuidanceOne: ['Please add a comma between emails if you want to invite several people.','여러명 초대할경우 이메일간 쉼표를 붙여주세요.'],
					youhavesentaninvitation: ['You have sent an invitation email.','초대 이메일을 발송했습니다.'],
					emailGuidanceTwo: ['If you can not see the email, please check the spam mail box.','이메일이 안보이실경우 스팸메일함을 확인해주세요.'],
					checktheemailaddress: ['Please check the e-mail address and the e-mail address.','메일발송실패, 이메일주소를 확인해주세요.'],
					waitforinvitees: ['Waiting for email invitees','명의 이메일 초대자 기다리는 중'],
					cannotenter: ['I can not enter anymore.','더 이상 입장이 불가합니다.'],
					/* invite message  end */



					  externalUser: ['External user', '외부사용자'],
	
					  termsOfUse: ['Terms of Use', '이용약관'],
					  privacyPolicy: ['Privacy Policy', '개인정보 보호정책'],
					  selectedMembers: ['Selected Members', '선택된 친구'],
					  groupMembers: ['Group Members', '그룹 친구'],
					  forgetYourPassword: ['Forget your password', '비밀번호 찾기'],
					  signUpUc: ['Sign up for UC', '가입하기'],
					  signUpRoundee: ['Sign up for Roundee', '가입하기'],
	
					  enterPasscode: ['Enter Passcode', '암호'],
					  shakeYourPhoneForHideChatRoom: ['The chat will disappear when enter password.\nShake the phone to see again.', '암호 입력 시 대화방이 목록에서 사라집니다.\n다시 보시려면 휴대폰을 흔들어주세요.'],
					  shakeYourPhoneForShowChatRoom: ['When enter your password, it appears in the list.', '암호 입력 시, 대화방이 목록에 나타납니다.'],
					  passcodeAlreadyDefine:['You have passcode already.\nPlease input your the passcode.','기존에 사용중인 암호가 있습니다.\n기존에 사용중인 암호를 입력해주세요.'],
					  revertHiddenChatroom: ['Revert hidden Chat\nwhen you enter passcode', '암호 입력 시, 대화방의 숨기기가 해제됩니다.'],
					  confirmPasscode:['Confirm Passcode', '암호 확인'],
					  FirstEnterYourPasscode:['Please enter the password you want.', '설정하실 암호를 입력해 주세요.'],
					  reEnterYourPasscode:['Re-enter your passcode.', '확인을 위해 암호를 재입력해 주세요.'],
					  incorrectPasscode: ['Incorrect Passcode', '입력한 비밀번호가 틀립니다.'],
					  incorrectPasscodeTryAgain: ['Incorrect Passcode.\nPlease try again.', '입력한 비밀번호가 틀립니다.\n다시 입력해 주세요.'],
					  LockOn: ['Set up passcode lock.', '암호잠금을 설정합니다.'],
					  LockOff: ['Enter your passcode', '암호를 입력해주세요.'],
					  LockPass: ['Enter your passcode, then you can use the app.', '암호를 입력해야 앱을 사용할 수 있습니다.'],
	
					  appLockPasscodeViewGuideWithHidden: ['IMPORTANT:\nUse passcode same with hidden chatroom\'s passcode. If you change passcode, also change hidden chatroom\'s passcode.', '주의:\n숨김방 비밀번호와 동일한 비밀번호를 사용합니다. 그러므로 변경시 숨김방 비밀번호가 같이 변경됩니다.'],
					  appLockPasscodeViewGuideNormal: ['IMPORTANT:\nIf you lost a passcode, please reinstall application after deleting. (In Android, you should sign in after deleting data of application.)', '주의:\n비밀번호를 잊어버리면, 앱을 삭제 후 재설치를 하거나, 안드로이드의 경우, 앱의 데이터를 삭제 후 재로그인을 하셔야 합니다.'],
					  // appLockOnPasscodeViewGuide: ['', ''],
					  // appLockOffPasscodeViewGuide: ['', ''],
	
					  daysAgo: [' days ago', ' 일전'],
					  monthsAgo: [' months ago', ' 달전'],
					  yearsAgo: [' years ago', ' 년전'],
	
					  pushNotification: ['Push Notification', '알림설정'],
					  pushNotificationMessage: ['Receive push notifications for new messages.', '대화 도착 알림 설정을 합니다.'],
					  showPreview: ['Show Preview', '알림내용 표시'],
					  showPreviewMessage: ['Enable this option to include a preview of the message when a push notification arrives.',
					  '대화 도착 알림시 대화내용을 미리보도록 설정합니다.'],
					  sounds: ['Sounds', '소리설정'],
					  vibrate: ['Vibrate', '진동설정'],
					  soundsVibrateMessage: ['Enable this option to receive a sound / vibration alert when a new message arrives.',
							'대화 도착 알림 방법을 설정합니다.'],
					  soundsVibrateMessageForiOS: ['Enable this option to receive a sound / vibration alert when a new message arrives while the app is running.',
							'실행중 대화 도착 알림 방법을 설정합니다.'],
					  groupChatNotification: ['New Group Chat Alerts', '새로운 그룹채팅방 알림'],//['Group Chat Notification', '그룹대화 알림'],
						groupChatNotificationMessage: ['Receive push notifications from a new group chat.',
						   '새로 초대된 그룹채팅방의 대화 도착알림을 받습니다.'],
					  dndTime: ['Do not disturb', '방해금지 시간설정'],
					  startTime: ['Start Time', '시작 시간'],
					  endTime: ['End Time', '종료 시간'],
					  remainConfTime: ['Time remaining', '남은시간'],
	
					  changeThemeMessage: ['Do you want change theme?', '테마를 변경하시겠습니까?'],
					  logoutMessage: ['All personal settings will be rmoved.\nAre you sure you want to log out?', '개인설정이 모두 지워집니다.\n접속해제 하시겠습니까?'],
					  logoutMessageWeb: ['Are you sure you want to log out?', '접속해제 하시겠습니까?'],
					  loggedoutMessage: ['You have been logged out', '접속해제되었습니다.'],
					  loggedoutFailedMessage: ['log out Failed.\nPlease try again after app restart.', '접속해제 실패하였습니다.\n앱을 재시작한 후 재시도해주세요.'],
					  leaveMessage: ['Are you sure want to leave this chat room?\nIf you leave, this chat room and message history will be deleted.',
							'나가기를 하시겠습니까?\n대화이력이 삭제됩니다.'],
					  groupNotice: ['You can register only one notice.\nWould you like to register a notice?',
							'공지는 1개만 등록할 수 있습니다.\n공지로 등록하시겠습니까?'],
	
					  photosPickMessage: ['Choose up to five images! Long click image for preview.',
							'5장까지 선택할 수 있습니다. 길게 누르면 미리보기 됩니다.'],
					  videosPickMessage: ['Choose up to five images! Long click image for preview.',
							'5장까지 선택할 수 있습니다. 길게 누르면 미리보기 됩니다.'],
					  startGroupChatMessage: [' did start group chat.', '님이 그룹대화를 시작했습니다.'],
					  imageString: ['[image]', '[사진]'],
					  videoString: ['[video]', '[동영상]'],
					  musicString: ['[music]', '[음악]'],
					  voiceString: ['[voice]', '[음성]'],
					  documentString: ['[document]', '[문서]'],
					  mapString: ['[map]', '[지도]'],
					  newVersionMessage: ['There is a new version. Would you like to update?',
							'새 버전이 있습니다. 업데이트 하시겠습니까?'],
					  unReadMessage: ['Unread message', '읽지 않음'],
					  typehere: ['Type here ...', '메세지를 입력하세요.'],
					  emailHintMessage: ['Please Input your email.', '이메일을 입력하세요.'],
					  idHintMessage: ['Please Input your employee number.', '사원번호를 입력하세요.'],
					  passwordHintMessage: ['Please Input your password.', '비밀번호를 입력하세요.'],
					  arrivedNewMessage: ['Arrived New Message.', '새 메세지가 왔습니다.'],
					  sendNoteHintMessage: ['Please input your note message.\nbatch sent to the message.', '쪽지 메시지를 입력하세요.\n1:1 메시지로 일괄 발송됩니다.'],
	
					  inputGroupName: ['Input group name.', '그룹이름을 입력하세요.'],
					  guideSearchContactFromWebLabelText: ['Input word to search.', '검색어를 입력하세요.'],
					  guideSearchContactFromWebLabelText2: ['Input word to search at least two characters.\nAnd you can add contacts.',
							'두 글자부터 검색되며\n연락처 추가를 할 수 있습니다.'],
	
					  searchContactFromWebCase401: ['Authentication failed.', '인증실패(ID or Password)'],
					  searchContactFromWebCase403: ['The empty string is the item.', '필수 항목의 누락'],
					  searchContactFromWebCase601: ['Json standard creation failed.', 'Json 규격 생성 실패'],
					  searchContactFromWebCase607: ['Search Keyword length failed.', '검색 키워드의 길이가 짧음.'],
					  searchContactFromWebCase608: ['No Data.', '검색된 데이터가 없습니다.'],
					  searchContactFromWebCase999: ['Provision Server Fail.', '인증 실패'],
	
					  thisIsLeaveRoom: ['This room has been removed.\nUnable to open the chat room.',
							'이 방은 삭제되었습니다.\n대화방을 열 수 없습니다.'],
	
					  cancelMessage: ['Are you sure you want to cancel?', '취소하시겠습니까?'],
					  searchInContacts: ['      Search in contacts', '      연락처 검색'],
					  searchInChats: ['      Search in Conversation', '      대화 검색'],
					  searchInGroups: ['      Search in Group', '      그룹 검색'],
					  searchInSearchs: ['      Search in Server', '      직원 검색'],
	
					  noRoomMember: ['No contacts', '대화상대 없음'],
					  noGroups: ['No Groups', '그룹 없음'], /* yj */
					  noChatroomList: ['No ChatRoom List', '대화 목록 없음'], /* yj */
					  noFavorites: ['No Favorites', '즐겨찾기 없음'], /* yj */
					  createYourOwnGroup: ['Create your own group', '그룹을 만드세요.'], /* yj */
	
					  deleteThisGroup: ['Delete this group.', '이 그룹을 삭제합니다.'],
					  deleteChannelSuccess :  ['Delete a Board successfully.', '보드가 삭제되었습니다.'],
					  deleteSelectedMember: ['Delete selected members.', '선택된 멤버들을 삭제합니다.'],
					  confirmUseAppSubject: ['• Please read the user agreement/terms of use below.', '• 본 프로그램을 사용하시기 전에 아래의 조건을 반드시 읽어 주십시오.'],
					  confirmUseAppConfirm: ['• User cannot use the program unless he/she agrees with this user agreement.', '• 본 사용동의서 내용에 동의하지 않으면 접속이 진행되지 않으며 프로그램을 사용할 수 없습니다.'],
					  confirmUseAppText: [
							'1. Scope of usage and matters requiring attention\n\n1.1 The program is provided only for company’s related matters and prohibited for individual use.\n\n1.2 By installing and using the program, users must obey the law such as not texting while driving. User who violates the law is responsible to the fine.\n\n1.3 Some functions such as file transmission and conversation record might be limited due to the security policy.\n\n1.4 According to the security related policy, user must prevent information leakage.\n\n\n2. Agreement for using saving personal information and usage records\n\n2.1 User agrees that terminal related personal information such as hand phone number, country name, Wifi MAC address, IMSI and UDID will be collected, used, and examined.\n\n2.2 Usage record and transmitted file will be inspected and analyzed. If a user violates any regulation, he/she and the team will be proceed and investigated according to the security violation policy.\n\n\n3. Agreement for frequency of product usage\n\n3.1 Personal records such as program average using time and file transmission will be collected and used to improve the program.\n\n\n4. Other\n\n4.1 This program is provided for Hyundai Motor Group employees and registered outsiders only. Other contents might be included according to each company security policy.\n\n',
							'1. 프로그램의 활용 범위 및 사용상 주의 사항\n\n1.1 본 프로그램은 회사 업무를 지원하기 위해 제공되는 것으로, 개인적인 용도로 사용할 수 없습니다.\n\n1.2 본 프로그램 설치·이용 시 운전 중 사용금지 등 관련 제반 법령을 준수하여야 하고, 그 위반에 따른 일체의 책임은 사용자 개인이 부담해야 합니다.\n\n1.3 파일 및 대화내용의 저장, 전달 기능은 당사의 보안정책에 따라 해당기능이 제한될 수 있습니다.\n\n1.4 본 프로그램 상의 제반 정보가 유출되지 않도록 보안을 철저히 유지하여야 합니다.\n\n\n2. 고유정보, 사용기록의 저장 및 활용\n\n2.1 휴대폰 번호, 사용국가, Wifi MAC 주소, IMSI, UDID 등 단말기 고유정보의 수집·이용·조회 등의 처리에 동의한 것으로 간주됩니다.\n\n2.2 사용기록 및 저장된 파일은 정기/부정기 감사에서 분석/조회되며 당사 규정위반 사항이 있는 경우 해당자 및 해당 팀은 보안 위규자 처리규정에 의해 조치됩니다.\n\n\n3. 프로그램 사용통계 활용\n\n3.1 본 프로그램의 접속내역 및 사용 시간, 파일 송수신 등의 기록은 개인 단위로 수집되며, 프로그램 개선을 위한 통계목적으로 활용됩니다.\n\n\n4. 기타\n\n4.1 본 프로그램은 현대자동차그룹 임직원 또는 등록된 외부인이 사용할 수 있으며, 본 동의서에 없는 내용은 당사 보안규정을 따릅니다.\n\n'
					  ],
					  confirmDeleteThisFile: ['Are you sure you want to delete this file, it cannot be undone.', '이 파일을 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'], /* yj */
	
	
					  FontBiggist: ['Biggest Font', '아주 크게'],
					  FontBig: ['Big Font', '크게'],
					  FontNormal: ['Normal Font', '보통'],
					  FontSmall: ['Small Font', '작게'],
					  setChatFontText: ['Set the font size of the Chatroom.', '채팅방의 글자 크기를 설정합니다.'],
					  viewEntireTextRetry: ['An error occurred while to get the message.\n Please try again in a few minutes.', '메세지를 가져오는 중 오류가 발생했습니다.\n 잠시 후 다시 시도해주세요.'],
					  viewEntireTextSender: ['did send message.', '님이 보내신 메세지.'],
					  viewEntireTextByMe: ['I sent message.', '내가 보낸 메세지.'],
	
					  loginProgressStart: ['Start a Verifying.', '인증을 시작합니다.'],
					  loginProgressAuthentification: ['Verifying the user.', '인증 처리 중입니다.'],
					  loginProgressContacts: ['The synchronization of contacts.', '주소록 동기화 중입니다.'],
					  loginProgressChatting: ['The synchronization of the conversation.', '대화 동기화 중입니다.'],
					  loginProgressComplete: ['Run the application.', '응용 프로그램을 실행합니다.'],
	
					  newMemberInvite: ['There is a new group members.\nWould you like to invite them to talk?', '새로운 그룹멤버가 있습니다.\n대화에 초대하시겠습니까?'],
					  checkUnreadMessage: ['You have unread message.\nmarking as read or loading more message', '안 읽은 메시지가 있습니다.\n모두 읽음처리하거나 더 가져올 수 있습니다.'],
	
					  removeFromFavoriteSuccess : ['Remove from Favorites successfully.', '즐겨찾기가 삭제되었습니다.'], /* yj */
					  //passwordReset : ['Please input your E-mail.\nIf you click OK button, ~~~', '가입 시 입력하신 회사 E-mail 주소를 입력해주세요.\n전송 버튼을 클릭하시면 입력하신 주소로  비밀번호 재설정 E-mail이 발송됩니다.'], /* yj */
	
					  enterIdAndPwd: ['Please enter your ID and password to sign in.', '로그인을 위해 아이디와 패스워드를 입력해주세요.'], /* yj */
					  rememberMe: ['Remember me', '로그인 유지하기'],/* yj */
					  rememberMe_Web: ['Remember ID', 'ID 기억하기'],/* yj */
					  isInvited: ['is invited', '님이 초대 되었습니다.'],/* yj */
					  isEntered: ['is entered', '님이 입장 하였습니다.'],/* yj */
					  wentOut: ['went out', '님이 나가셨습니다.'],/* yj */
					  Exited: ['Exit', '퇴장 했습니다.'],
					  Entered: ['Entered', '입장 하였습니다.'],
	
					  publicChannel: ['Anyone can join this Board and invite others.', '누구나 가입할 수 있으며, 초대할 수 있습니다.'],/* yj */
					  privateChannel: ['Only people invited to this Board may join.', '초대된 사람만 가입할 수 있으며, 검색 시 표시가 안 됩니다.'],/* yj */
					  enterNameOrEmail: ['Search user in roundee or type e-mail address to invite', '라운디 사용자 검색 또는 이메일 주소 입력해서 사용자 초대'],/* yj */
					  createdChannel: ['Your board was created.', '보드가 생성되었습니다.'],/* yj */
					  confirmDeleteContents : ['Are you sure you want to delete this contents, it cannot be undone.', '이 컨텐츠를 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'], /* yj */
					  confirmDeleteMessage : ['Are you sure you want to delete this message, it cannot be undone.', '이 메시지를 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'], /* yj */
	
	
					  confirmDeleteGroup : ['Once you delete this group, it cannot be undone.', '이 그룹을 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'], /* yj */
	
					  deleteConversation : ['Are you sure to delete this conference?', '이 대화를 삭제하시겠습니까?'], /* yj */
					  confirmdeleteConversation : ['Once you delete this conversation, it cannot be undone.', '이 대화를 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'], /* yj */
					  deleteChannelSuccess : ['Delete a board successfully.', '보드가 삭제되었습니다.'], /* yj */
					  leaveChannelSuccess : ['Leave a board successfully.', '보드 구독이 해제되었습니다.'], /* yj */
					  leaveThisChannel : ['Leave this Board?', '보드 구독을 해지하시겠습니까? '], /* yj */
					  selectDelegateOwner : ['Please select one to delegate owner.', '권한을 위임할 사람을 선택해주세요.'], /* yj */
					  wasDeletedBy : ['was deleted by', '는 삭제되었습니다.'], /* yj */
	
					  deleteThisPost: ['Are you sure want to permanently remove this post?', '선택한 게시물을 삭제하시겠습니까? \n삭제 후 취소할 수 없습니다.'],/* yj */
					  deleteThisChannel: ['Are you want to delete this Board?', '이 보드를 삭제하시겠습니까?'],/* yj */
					  leaveThisChannel: ['Are you want to leave this Board?', '이 보드의 구독을 해지하시겠습니까?'],/* yj */
					  //inviteYouTo: ['invite you to', '이 당신을 초대합니다.'],/* yj */
					  subscribeBoardIt: ['Are you sure you want to join the Board?', '선택하신 보드에 가입하시겠습니까?'],/* yj */
					  SendAInvitation: ['Send a invitation successfully.', '초대메시지를 보냈습니다.'],/* yj */
					  TryIt :  ['Cannot send a file. Try it again.', '다시 시도하세요.'],/* yj */
	
					  HideOnConversationSuccess :  ['Hide On the conversation successfully.', '숨김방으로 설정했습니다.'],/* yj */
					  NotHaveAnyHiddenChat :  ['You do not have any hidden chat yet.', '숨김방이 없습니다.'],/* yj */
					  TopOnConversationSuccess :  ['Top On the conversation successfully.', '고정방으로 설정했습니다.'],/* yj */
	
					  deleteThisConference :  ['Delete this conference?', '선택한 영상회의를 삭제 하시겠습니까?'],/* yj */
	
					  endConference :  ['End this conference', '영상회의 종료'],/* yj */
					  sureEndThisConference :  ['Are you sure to end this conference?', '영상회의를 종료하시겠습니까?'],/* yj */
	
	
	
					  AddUsers :  ['Add users(Search or Drag & Drop from contacts and groups list)', '채팅멤버 추가'],/* yj */
					  webIviteMemberToChatRoom: ['+ Invite People (Search or type email)', "+ 사용자 추가 (멤버 검색 또는 E-mail 주소 입력)"],
					  //NotHaveAnyHiddenChat :  ['You do not have any hidden chat yet.', ''],/* yj */
					  //TopOnConversationSuccess :  ['Top On the conversation successfully.', ''],/* yj */
					  //EnterYourPasscode :  ['Want to see hide chat, enter your passcode. (4 digits)', ''],/* yj */
					  //incorrectPasscode :  ['Incorrect Passcode.', ''],/* yj */
					  //hideConversation :  ['Once you hide this conversation, you should enter passcode to see it.', ''],/* yj */
					  //passcodeAlready :  ['You have passcode already.', ''],/* yj */
					  //enterPasscode :  ['Enter Passcode.(4 digits)', ''],/* yj */
					  //resultsFor :  ['results for', ''],/* yj */
	
					  //addFavoriteSuccess :  ['Add to Favorites successfully.', ''],/* yj */
					  searchResultAre :  ['the search results are', ' 로 검색한 결과는 '],/* yj */
					  searchResultCnt :  ['cases.', '건 입니다.'],
	
					  //enterConferenceBeforeStarting :  ['You can enter the conference about 5 minutes before starting.', ''],/* yj */
					  //conferenceAdded :  ['Your conference was added.', ''],/* yj */
					  //eventUpdated :  ['Your event was updated.', ''],/* yj */
	
					  //createConferenceBy30 :  ['You can run your web conference for up to 30 min during our beta test.\nYou can create, edit or delete a conference before 5 minutes.', ''],/* yj */
					  createConferenceBy40 :  ['You can run your web conference for up to 40 min during our beta test.\nYou can create, edit or delete a conference before 5 minutes.', '최대 40분 영상회의를 생성할 수 있으며, 영상회의 수정은 컨퍼런스 시작 5분 전 까지 수정할 수 있습니다.'],/* yj */
					  //conferenceAutomatically :  ['The conference call automatically be recorded in the meeting when you select this option.', 'The conference call automatically be recorded in the meeting when you select this option.'],/* yj */
					  //enterColleague :  ['Enter colleague or external user’s name or e-mail address..', ''],/* yj */
	
					  leaveConference :  ['Which do you want to leave or end this conference?', 'Which do you want to leave or end this conference?'],/* yj */
	
					  //endOfThe :  ['End of the', ''],/* yj */
					  //extend :  ['Extend', ''],/* yj */
					  //beforeStarting5Min :  ['You can enter the conference about 5 minutes before starting.', ''],/* yj */
					  //automaticallyClose :  ['This page will close automatically after 15 seconds.', ''],/* yj */
					  //leaveAfter10Min :  ['Leave this conference after 10min?', ''],/* yj */
					  //youWillLeave :  ['You will leave', ''],/* yj */
					  //in10Min  :  ['in 10 min.', ''],/* yj */
					  //keepThisConference  :  ['If you want to keep this conference, please select after 30 min.', ''],/* yj */
					  //sureToStopRecording :  ['Are you sure to stop recording?', ''],/* yj */
	
					  passcodeLock: ['Passcode Lock', '암호 잠금'],
					  passcodeChange: ['Change Passcode', '암호 변경'],
					  passcodeChange: ['Change Passcode', '암호 변경'],
	
					  readThisFar: ['Read this far', '여기까지 읽었습니다.'],
	
					  imageSendMailToMe: ['Would you like to send a photo as an attachment to your e-mail account?', '본인의 이메일계정으로 사진을 첨부하여 보내시겠습니까?'],
					  videoSendMailToMe: ['Would you like to send a video as an attachment to your e-mail account?', '본인의 이메일계정으로 동영상을 첨부하여 보내시겠습니까?'],
	
					  noticeAlwayson: ['Since your mobile can not use android push notification service(GCM), you have to use another access function in order to receive Mtalk notifications.\n\n' +
						  'Using this function\n may increase your mobile power consumption.\n' +
						  'You will still receive notifications\n although you are not running the mTalk application.\n\n' +
						  'When you do not use the access function,\n your mobile power consumption will not increase.\n' +
						  'You can receive notifications\n only while using mTalk.\n\n' +
							'※ There is no other difference beside this notification access function.',
							'현재 사용하시는 단말기는 안드로이드 푸시알림기능(GCM) 사용이 불가하여 mTalk 메시지 수신알림을 위해 상시접속기능이 필요합니다.\n\n'+
							'[상시접속모드 사용하는경우]\n'+
							'대기전력소모 일부증가.\n'+
							'mTalk미사용 시에도 \n메시지 수신알림 가능.\n\n'+
							'[상시접속모드 사용하지 않는경우]\n'+
							'대기전력소모 증가없음.\n'+
							'mTalk사용중에만 \n메시지 수신 알림 가능.\n\n'+
							'※그외, 모든 기능은 동일하게 동작합니다.'],
					  noticeAlwayson2: ['This function is provided for Mtalk message notification in some areas such as China (or for some mobiles), where Google Service has been blocked.\n\n' +
						  'Using this function\n may increase your mobile power consumption.\n' +
						  'You will still receive notifications\n although you are not running the mTalk application.\n\n' +
						  'When you do not use the access function,\n your mobile power consumption will not increase.\n' +
						  'You can receive notifications\n only while using mTalk.\n\n' +
						  '※ If you do not live in the area where Google Service has been blocked, using this function is strongly not recommended.',
							'본 상시접속모드는 중국과 같이 구글서비스가 차단된 지역(혹은 차단된 단말)에서의 mTalk 메시지 수신일림을 위해 선택하는 기능입니다.\n\n'+
							'[상시접속모드 사용하는경우]\n'+
							'대기전력소모 일부증가.\n'+
							'mTalk미사용 시에도 \n메시지 수신알림 가능.\n\n'+
							'[상시접속모드 사용하지 않는경우]\n'+
							'대기전력소모 증가없음.\n'+
							'mTalk사용중에만 \n메시지 수신 알림 가능.\n\n'+
							'※ 구글서비스가 차단된 지역(혹은 단말)이 아니라면 본 기능은 사용이 불필요합니다.'],
	
	
					  deletePicture : ['Once you delete this picture, it cannot be undone.', '삭제한 사진은 다시 복구 할 수 없습니다.'],
					  makePublic : ['Make Public','공개'],
					  pushOption : ['Enable this option to receive push notifications from a new group chat.','신규 생성된 그룹의 메세지에 대한 알림을 수신 할 수 있습니다.'],
					  passwordIncorrect : ['Your password was incorrect.','비밀번호 오류입니다'],
					  tooShort : ['Too short','비밀번호의 길이는 8~20자여야 합니다.'],
					  matchPasswordTooShort : ['Match password too short','비밀번호의 길이는 8~20자여야 합니다.'],
					  passwordsNotMatch : ['Passwords do not match','비밀번호가 일치 하지 않습니다.'],
					  passwordsMatch : ['Passwords match','비밀번호가 확인 되었습니다.'],
					  accountUpdate : ['Your account has been updated.','사용자 정보가 변경 되었습니다.'],
	
					  newConfReservationSetGuide : ['Enter','입력'],
					  newConfReservationHours : ['hour(s)','시간'],
	
					  startConference: ['Start Conference', '영상통화 시작'],  /* yj*/
					  recFile:['Recording File.mp4', '녹화파일.mp4'],
	
					  invitemessage:['Invite %memberlist% by %sender%', '%sender% 님이 %memberlist% 님을 초대 하였습니다.'],
					  exitmessage:['%member% left this chatroom.', '%member% 님이 나갔습니다.'],
	
					  searchValueCondition:['This character set( + - && || ! ( ) { } [ ] ^ " ~ * ? : \\ ) is not allowed on searching.', '검색 조건에 + - && || ! ( ) { } [ ] ^ " ~ * ? : \\ 는 허용되지 않습니다.'],
					  uploadingFile:['Uploading File...', '파일을 업로드하고 있습니다...'],
					  warnUploadFile:['Processing uploaded file...\nPlease upload new file after previous file is complete.', '파일이 업로드 중입니다.\n이전 파일 업로드가 완료되면 시도해주세요.'],
	
					  warnApplyAll:['Are you sure want to Apply All?', '일괄적용을 하시겠습니까?'],
	
					  inputMessage:['Enter your message here(press Shift+Enter for multiple lines)','메시지 입력 후 Enter키를 눌러 전송하세요. (줄바꿈은 Shift+Enter)'],
	
					  pleaseCheckPush: ['If push notifications set NO, you can\'t use this function.',
							'대화 도착 알림이 꺼져있다면 사용하실 수 없는 기능입니다.'],
	
					  bannerForCameraAlbum: ['An album containing of photo/video shooting with camera button below. It will be automatically erased(Schedule marks at the Photo bottom)',
					  '오른쪽 하단의 보안카메라 버튼을 통해 촬영된 사진/동영상이 임시 보관되는 앨범입니다. 30일 보관 후 자동 삭제 됩니다.(삭제일 사진 하단 표시)'],
					  bannerForChatRoomAlbum: ['An album containing of photo/video exchanged in chatting room. It will be automatically erased(Schedule marks at the Photo bottom)',
					  '대화방을 통해 주고 받은 사진/동영상이 보관되는 앨범입니다. 30일 보관 후 자동 삭제 됩니다(삭제일 사진 하단 표시)'],
					  warningMessage: ['Set on \'do not disturb\', but times are not set. If you want to set times, select \'back\' or want to cancel the setting, select \'leave\'.',
						  '방해금지를 사용하도록 설정되어 있으나 시간이 설정되어 있지 않습니다. 시간을 설정하시려면 \'이전\', 설정을 취소하시려면 \'나가기\'를 선택하세요.'],
	
					  showBackgroundPreview: ['Show Notification Preview', '알림 미리보기 표시'],
					  showBackgroundPreviewMessage: ['Enable this option to preview of the message popup when notification arrives on background or screen off.',
					  '앱이 실행중이지 않거나 화면 꺼짐, 잠금상태에서도 대화 도착 알림 팝업이 보이도록 설정합니다.'],
					  noSearchResult: ['No search results', '검색결과 없음'],
					  writeComment: ['Write a comment...', '댓글을 입력하세요...'],
					  writeDescription: ['Write a description...', '설명을 입력하세요...'],
					  writeTitle: ['Write a title...', '제목을 입력하세요...'],
					  photoPostedBy: ['Photo posted by', '님이 게시한 사진'],
					  searchGuide: [
							'1. 복합 검색: 합집합\n 단어의 나열\n ex: 제안서 발표\n' +
							'2. 복합검색: 교집합\n 단어 사이의 comma(,) 로 구분\n ex: 제안서, 발표\n 제안 발표, 결과 => 제안 발표 like 검색 & 결과 like 검색으로 진행\n'+
							'3. type 검색\n colon(:)뒤에 type 입력\n :image => image 에서 검색. :video => video 모두 검색\n'+
							'4. 발신자 검색\n @로 시작하는 경우\n ex: @hscho\n'+
							'5. 일치 검색\n \"로 문장을 감싸는 경우 사이의 빈칸이나 comma 등 특수기호등을 문자로 취급한다.',
	
							'1. 복합 검색: 합집합\n 단어의 나열\n ex: 제안서 발표\n' +
							'2. 복합검색: 교집합\n 단어 사이의 comma(,) 로 구분\n ex: 제안서, 발표\n 제안 발표, 결과 => 제안 발표 like 검색 & 결과 like 검색으로 진행\n'+
							'3. type 검색\n colon(:)뒤에 type 입력\n :image => image 에서 검색. :video => video 모두 검색\n'+
							'4. 발신자 검색\n @로 시작하는 경우\n ex: @hscho\n'+
							'5. 일치 검색\n \"로 문장을 감싸는 경우 사이의 빈칸이나 comma 등 특수기호등을 문자로 취급한다.\n'
					  ],
					  descriptionLaboratory : ['You can discuss and communicate over specific topic or issue in BOARD.\nTo start using BOARD, set BOARD switch ON.',
							'보드는 프로젝트와 같은 특정 주제를 중심으로 동료간에 공유할 수 있는 커뮤니티 입니다.\n보드 사용을 원하시면 켜짐을 선택하세요.'],
	
					  hintBoardNameInput: ['Board Name','보드 이름'],
					  hintBoardPurposeInput: ['Briefly describe the purpose of this board', '이 보드에 대한 설명을 간략하게 적어주세요.'],
					  hindBoardSearch: ['Search all of public board', '공개 보드에 대한 모든 검색'],
					  hintPopupInvite: ['Search user in roundee or type e-mail address to invite', '라운디 사용자 검색 또는 이메일 주소 입력해서 사용자 초대'],
					  hintChatroomName: ['Chat room name', '대화방 이름'],
					  hintPopupInviteUsecase: ['Please separate multiple addresses with commas(,).', '여러 명 입력 시, 콤마(,)로 구분해주세요.'],
					  hintConferenceName: ['Conference title', '영상회의 이름'],
					  hintConferenceDesc: ['Briefly describe the conference(optional)', '영상회의에 대한 설명을 간략하게 적어주세요.(옵션)'],
	
					  hintJoinBoard: ['Join Board', '보드 가입하기'],
	
					  changeChatRoomName: ['Change room name', '대화방명 변경'],
					  makeYourOwnGroup: ['You can make your own group to click the button.', '본인만의 그룹을 만들어보세요!'],
					  makeBoardHere: ['Create a new board or search a public board', '새 보드 만들기 또는 공개 보드 검색하기'],
					  makeConferenceHere: ['Start your conference here and now.', '지금 여기서 바로 영상회의를 시작해보세요!'],
	
					  boardJoinComplete: ['You joined the board successfully.', '보드에 가입되었습니다.'],
				},
	
				alert:{
					  wrongStartConferenceTime: ['Please check your conference time.\n(Conference start time must be set 5 minutes after the current time.)', '영상회의 시간은 현재 시간보다 5분 후로만 설정이 가능합니다.'],
					  wrongEndConferenceTime: ['Please check your conference time.\n(Conference end time can not be earlier than the start time.)', '영상회의 종료 시간은 시작 시간 보다 이전 일 수 없습니다.'],
					  wrongEditConference: ['5 minutes before the start videoconferencing can not be edited', '영상회의 시작 5분전에는 편집을 할 수 없습니다.'],
					  wrongConferenceMaxTime: ['You can create conference by 40 minutes.', '영상회의 시간은 최대 40분 까지 입니다.'],
	
					  reMainConferenceTime: ['You have %time% minutes left.', '%time%분 남았습니다.'],
	
	
					  noResponse: ['There is no server response.\nPlease retry in a few minutes.', '서버응답이 없습니다.\n잠시 후 재시도 바랍니다.'],
					  emptyName: ['Please input name.', '이름을 입력하세요.'],
					  tooLongName: ['Please set fewer name than 20 characters.', '이름을 20자 이하로 입력하세요.'],
					  emptyMember: ['Please select member over 1 person.', '1명 이상의 멤버를 선택하세요.'],
					  emptyGroupMember: ['Please select Group include 1 person.', '선택한 그룹은 구성원이 존재 하지 않습니다.'],
					  oemSetForUseImage: ['Settings > photos to access the photos in the Privacy Policy.', '설정 > 개인 정보 보호 정책에서 사진에 액세스 할 수 있도록 하세요.'],
					  errorVideoLoading: ['Error on loading Video.', '비디오를 불러오는 중 에러가 발생했습니다.'],
					  displayOrginalImage: ['Display original image.', '원본 이미지 출력'],
					  errorAddFavorite: ['Fail to add favorites.\nPlease check max count.', '즐겨찾기 등록에 실패했습니다.\n최대 허용 갯수를 초과했는지 확인해주세요.'],
					  emptyEmail: ['Please input your email.', '이메일을 입력하세요.'],
					  emptyPassword: ['Please input your password.', '비밀번호를 입력하세요.'],
					  imageSelectMaxNumber: ['Already selected images maximum number.', '선택할 수 있는 이미지 갯수를 초과했습니다.'],
					  duplicateName: ['Already exists same name.', '같은 이름이 존재합니다.'],
					  enterTwoCharacters: ['Enter at least two characters.', '두 글자 이상 입력해야 합니다.'],
					  needAgree: ['You are required to agree to the terms of program use.', '프로그램 사용 동의가 필요합니다.'],
	
					  provisionClientError: ['Failed authentication attempts.', '인증시도하지 못했습니다.'],
					  provisionUserError: ['Please check your user email or password.', '이메일 또는 비밀번호를 확인해 주세요.'],
					  provisionUserDisabledError: ['This account has been disabled.', '사용이 중지된 계정입니다.'],
	
					  provisionServerError: ['An error occurred during the authentication process.', '인증처리시 오류가 발생하였습니다.'],
					  provisionErrorUserLock: ['User has been locked due to failed login attempts set.\nPlease retry after 60 minutes.', '로그인 5회 실패로 인해 계정잠금되었습니다.\n60분 후 재시도 해주세요.'],
					  provisionErrorLongTerm: ['Users do not have a long-term connection is not connected locks.', '장기간 미접속으로 인한 잠금되었습니다.'],
					  provisionErrorDeletedUser: ['User is deleted user. The user can not use.', '삭제된 사용자 입니다.'],
	
					  multipleDeviceError: ['The duplicate device is registered.\nPlease use the terminal \nafter the registration in the Personal WEB.',
					  '중복 단말이 등록되었습니다.\n개인WEB에서\n단말등록 후 사용하세요.'],
					  multipleDeviceErrorForHK: ['The duplicate device is registered.\nPlease use the terminal \nafter the registration in the Personal WEB\n(https://mtalkportal.hmckmc.co.kr/).',
					  '이미 등록된 기기가 존재합니다.\n단말 관리 웹(https://mtalkportal.hmckmc.co.kr/)에서 기기변경 등록 후 사용하세요.'],
					  multipleDeviceErrorForHK2: ['The duplicate device is registered.\nPlease use the terminal \nafter the registration in the External Registration WEB\n(https://mtalk.hyundai.com/).',
					  '이미 등록된 기기가 존재합니다.\n외부사용자 웹(https://mtalk.hyundai.com/)에서 기기변경 등록 후 사용하세요.'],
	
					  apLoginServerError: ['Authentication failed.\nPlease contact the system administrator.',
					  '인증실패 하였습니다.\n시스템 관리자에 연락바랍니다.'],
					  apVersionNotSupported: ['The version can not access.\nPlease download the new version.',
					  '접속할 수 없는 버전입니다.\n새 버전을 다운받으세요.'],
					  //appstore 등록 후 정리
					  apDownloadDescForiOS: ['\n\nYou may also be downloaded\nfrom the link below.', '아래 링크에서 다운 받으실 수 있습니다.'],
					  // apDownloadDescForiOS: ['\n\nYou may also be downloaded\nfrom the AppStore.', 'AppStore에서 다운 받으실 수 있습니다.'],
					  //
					  apDownloadDescForAndroid: ['\n\nYou may also be downloaded\nfrom the PlayStore.', 'PlayStore에서 다운 받으실 수 있습니다.'],
					  apDeclineError: ['The unregistered client.\nPlease use the client after registration.', '등록되지 않은 단말입니다.\n단말등록 후 사용바랍니다.'],
					  apNotConnected: ['Unable to connect.\nPlease check your network.', '접속할 수 없습니다.\n네트워크를 확인해 주세요.'],
					  apInvalidCommand: ['Invalid command.', '잘못된 명령입니다.'],
					  apInvalidUserInfo: ['Invalid user info.', '사용자정보가 없습니다.'],
	
					  apInternalServerError: ['Internal Server Error', '시스템 에러입니다.'],
					  maxLimitChat: ['You can transfer up to a maximum size of 12K.', '최대크기 12K 까지 전송할 수 있습니다.'],
					  maxChatMember: ['You can do up to 150 people group conversation.', '150명까지 그룹대화를 할 수 있습니다.'],
					  maxGroupMember: ['You can create a group of up to 150 people.', '150명까지 그룹으로 만들 수 있습니다.'],
					  maxChooseMember: ['You can create a group of up to 150 people.', '본인을 포함하여 150명까지 선택할 수 있습니다.'],
	
					  maxLimitBoardPost: ['The maximum size for a text is 1000bytes.', '최대 1000byte까지 입력할 수 있습니다.'],
					  maxLimitBoardPostFile: ['You can only add 10 files to a post.', '게시물에는 최대 10개의 파일만 추가할 수 있습니다.'],
	
					  noNetwork: ['There is no network.\nYou can not login',
							'연결된 네트워크가 없습니다. 로그인 할 수 없습니다.'],
					  noNetworkAlarm: ['There is no network.\nYou can not transfer the conversation',
							'연결된 네트워크가 없습니다. 대화를 전송할 수 없습니다.'],
					  notChatYourself: ['Can not chat to yourself', '자신에게 채팅을 할 수 없습니다'],
					  downloadFail: ['Download fail.\nPlease check your network connection.', '다운로드 실패하였습니다.\n네트워크 연결을 확인해 주세요.'],
					  msgForSearching: ['Searching...', '검색중...'],
	
					  msgForLoading: ['Loading...', '가져오는 중...'],
					  setPWMsg: ['Please Set Password.', '암호를 설정해주세요.'],
					  successSendMail: ['Email sent successfully.', '이메일을 전송했습니다.'],
					  errorSendMail: ['Email transfer failed.', '이메일 전송에 실패했습니다.'],
					  eMailAccountInvalid: ['Failed to get registered e-mail account information.', '등록된 이메일 계정정보를 가져오지 못했습니다.'],
					  doNotUnlock: ['You cannot unlock for security reasons.', '보안 정책상 해제하실 수 없습니다.'],
					  allowPushForIphone: ['Please check device\'s \[Settings -> Notifications -> ' + appName + '\] \"Allow Notifications\" is on.\n Please turn on and restart app.',
						  '디바이스의 \[설정 -> 알림 -> ' + appName + '\]의 \"알림허용\"이 켜져있는지 확인해주세요.\n 설정 후 App을 재시작해주세요.'],
					  allowPushForAndroid: ['Please check device\'s \[Settings -> More -> Application manager -> ' + appName + '\] \"Show Notifications\" is ckecked.\n Please check the checkbox and restart app.',
							'디바이스의 \[설정 -> 어플리케이션 관리자 -> ' + appName + '\]의 \"알림표시\"가 체크되어 있는지 확인해주세요.\n 체크 후 App을 재시작해주세요.'],
	
					  convertErrorNotExistBefore: ['Source file is not exist.', '변환할 파일을 찾을 수 없습니다.'],
					  convertErrorNotExistAfter: ['Source file is not exist after save.', '저장한 파일을 찾을 수 없습니다.'],
					  convertErrorSaveBackup: ['Fail to save backup file.', '백업파일 저장에 실패했습니다.'],
					  convertErrorLoadData: ['Fail to load data of Source file.', '변환할 파일을 읽기에 실패했습니다.'],
	
					  SuccessImageUpload: ['The image is uploaded to the server has been completed.', '서버에 사진 업로드가 완료되었습니다.'],
					  SuccessVideoUpload: ['The video is uploaded to the server has been completed.', '서버에 동영상 업로드가 완료되었습니다.'],
					  FailImageUpload: ['The image uploaded to the server failed. Please try again later.', '서버에 사진 업로드가 실패했습니다. 잠시후 다시 시도해주세요'],
	
					  ConferenceAlertMsgBeta: ['You can use only 40 minutes during BETA period.', '베타기간 동안은 40분만 사용하실 수 있습니다.'],
					  ConferenceDuringTBeta: ['40 Min', '40 분'],
					  donotdisturbWarning: ['Please set on \'Do not disturb\'', '방해금지 시간설정 스위치를 켜주세요.'],
	
					  checkCameraRecordPermissionForIphone: ['Please check device\'s \[Settings -> ' + appName + ' -> Camera \] switch is on.\n Please turn on and try again.',
						  '디바이스의 \[설정 -> ' + appName + ' -> 카메라 \]의 스위치가 켜져 있는지 확인해주세요.\n 설정 후 재시도 해주세요.'],
					  checkCameraRecordPermissionForAndroid: ['Please check device\'s \[Settings -> Application manager -> ' + appName + ' -> Permissions -> Camera \] switch is on.\n Please turn on and try again.',
						  '디바이스의 \[설정 -> 어플리케이션 관리자 -> ' + appName + ' -> 권한 -> 카메라 \]의 스위치가 켜져 있는지 확인해주세요.\n 설정 후 재시도 해주세요.'],
	
					  createNewRoomWhenGroupChat: ['If invited in a group chat rooms,\ncreate into a new room.', '그룹대화방에서 초대 시\n새로운 방을 생성합니다.'],
					  confirmNewOrMoveRoom: ['There is the chat room of same members.\nMove to the room? or create a new room?', '동일 구성원의 대화방이 있습니다.\n이 방으로 이동하시겠습니까? 새로운 방을 생성하시겠습니까?'],
	
					  confirmDeleteContact: ['Are you sure you want to delete the contact?', '연락처를 삭제하시겠습니까?'],
					  alertNotDeleteOrg: ['He is an organization member. Can not be deleted.', '조직도 멤버입니다. 삭제할 수 없습니다.'],
					  alertNotDeleteGroup: ['He is a group member. Can not be deleted.', '그룹 멤버입니다. 삭제할 수 없습니다.'],
					  alertNotDeleteChat: ['There is chat history with him. Can not be deleted.', '대화이력이 있습니다. 삭제할 수 없습니다.'],
					  alertCanNotUseMedia: ['Media files you have selected is unsupported format or size.', '선택하신 미디어 파일은 지원하지 않는 형식이나 사이즈를 가지고 있습니다.'],
	
					  wrongEmail: ['Wrong E-mail Format', '잘못된 이메일 형식입니다.'],
					  duplicatedEmail: ['Following E-mail was duplicated', '아래 이메일은 중복 입력되었습니다.'],
					  emptyConfMember: ['please select Conference member over 1 person.', '1명 이상의 영상회의 멤버를 선택하세요.'],
					  emptyConfTitle: ['please Input Conference Title.', '영상회의 제목을 입력하세요.'],
	
					  failCreateConfRoom: ['Fail create Conference Room', '영상회의 생성에 실패 하였습니다.'],
					  failEditConfRoom: ['Fail edit Conference Room', '영상회의 정보 수정에 실패 하였습니다.'],
					  failDeleteConfRoom: ['Fail delete Conference Room', '영상회의 삭제에 실패 하였습니다.'],
	
					  alreadyFileExist: ['This file is Already Exist', '이미 존재하는 파일입니다.'],
					  NotSupportExt: [' extension is not supported.', '지원 하지 않는 File Type 입니다.'],
	
					  alreadyMemberExist: ['This Member is Already Exist in This Chat Room.', '참여된 멤버입니다.'],
	
					  alertInvalidTypeChar: ['Special character is not allowed.','특수문자는 허용되지 않습니다.'], /* web: not using this */
	
					  alreadyMemberRegister: ['This Member is Already Regist.', '이미 등록된 멤버입니다.'],
					  alreadyGroupRegister: ['This Group is Already Regist.', '이미 등록된 그룹입니다.'],
					  wrongMember: ['This User is not Regist.', '등록되지 않은 사용자입니다.'],
				}
		  };
	
		  var categoryKeys = Object.keys(localeText);
		  for(var c=0, cn=categoryKeys.length ; c<cn ; c++){
				var categoryKey = categoryKeys[c];
				var categoryObject = localeText[categoryKey];
	
				var propertyKeys = Object.keys(categoryObject);
				for(var p=0, pn=propertyKeys.length ; p<pn ; p++){
					  var propertyKey = propertyKeys[p];
					  var propertyObject = categoryObject[propertyKey];
	
					  if(propertyObject[index]==undefined){
							localeText[categoryKey][propertyKey] = propertyObject[0];
					  }
					  else{
							localeText[categoryKey][propertyKey] = propertyObject[index];
					  }
				}
		  }
	
		  return localeText;
	};
	
	module.exports = UcText;
	
	},{}],40:[function(require,module,exports){
	(function (global){
	/*
	* Determines the global context. This should be either window (in the)
	* case where we are in a browser) or global (in the case where we are in
	* node)
	*/
	var globalContext;
	
	if(typeof window == 'undefined') {
		globalContext = global;
	}
	else {
		globalContext = window;
	}
	
	if (!globalContext) {
		var error = new Error('Unable to set the global context to either window or global.');
		throw error;
		error = null;
	}
	
	module.exports = globalContext;
	
	}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
	},{}],41:[function(require,module,exports){
	var globalcontext = require('./global-context');
	var GLOBAL = new (require('./GlobalFunctions'));    globalcontext.GLOBAL = GLOBAL; globalcontext.CONST = GLOBAL.CONST;
	
	var language = '';
	if( navigator.language!==undefined){
		language = navigator.language;
	}
	else{
		if(navigator.languages!==undefined){
			language = navigator.languages[0];
		}
		else{
			language = navigator.browserLanguage;
		}
	}

	var confid = '.vconf2@linearhub.com';
	if(window.location.hostname.indexOf('roundee.io')!==-1){
		confid = '.vconf2@linearhub.com';
	}
	
	/* 접속국가 체크 */
    var lang = (navigator.language?navigator.language:navigator.userLanguage);
    lang = lang.substr(0,2);

    if(lang === 'ko'){
        var UcText = new (require('./UcText'))('ko', 'Dial070');    
    }else{
        var UcText = new (require('./UcText'))('en', 'Dial070');    
    }
	  globalcontext.LOCALE = UcText;
    var UcEngine = new (require('./ucEngine/UcEngine'))(confid);   globalcontext.ucEngine = UcEngine;
	
	},{"./GlobalFunctions":35,"./UcText":36,"./global-context":40,"./ucEngine/UcEngine":45}],45:[function(require,module,exports){
	'use strict';
	
	function UcEngine( confid ) {
		let ucengine = {};
		ucengine.confid = confid;
		ucengine.Video = new( require("./VideoCallEngine") )();

		return ucengine;
	};
	
	module.exports = UcEngine;
	
	},{"../common/ucSocket":39,"./ChatEngine":42,"./ConferenceEngine":43,"./RegisterEngine":44,"./VideoCallEngine":46}],46:[function(require,module,exports){

	function VideoCallEngine(){
    var adapter = require('./webrtc-adapter');
		// for sfu
		this.mainsession = null;
		this.mainstream = null;
		this.viewersession = {};
		this.screensharesession = null;
		this.sharevideosession = null;
		this.recwhiteboardsession = null;
	
		this.rtpsender = null;
	
		this.negotiationneeded = false;
	
		let dummyvideotimer = null;
		let dummystream = null;
	
		let localrecorder = null;
		
		this.getDeviceStatus = function(param){
			if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
				navigator.mediaDevices.enumerateDevices().then(function(devices){
					let devicestatus = 'all';
					let audiodevicelist = [];
					let videodevicelist = [];
					if (devices && devices.length > 0) {
						devices.forEach(function (device) {
							if (device.kind === 'audioinput') {
								if (device.deviceId !== 'communications' && device.deviceId !== 'default') {
									audiodevicelist.pushObject(device);
								}
							}
							else if (device.kind === 'videoinput') {
								let scanner = /scanner/;
								if(!scanner.test(device.label)){
									videodevicelist.pushObject(device);
								}
							}
						});
	
						if (videodevicelist.length === 0 && audiodevicelist.length === 0){
							devicestatus = 'none';
							console.log('sori test : devices check1 = >' + JSON.stringify(devices));
						}
						else{
							if(videodevicelist.length === 0){
								devicestatus = 'audioonly';
								console.log('sori test : devices check2 = >' + JSON.stringify(devices));
								if(param.devicetype==='pc' && adapter.browserDetails.browser!=='safari'){
									let selecteddevice = sessionStorage.getItem('selectdevice');
									if(!selecteddevice || selecteddevice===''){
										sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr({audio: {label:audiodevicelist[0].label, deviceId: audiodevicelist[0].deviceId}}));
									}
								}
							}
	
							if(audiodevicelist.length === 0){
								devicestatus = 'videoonly';
							}
	
							if(devicestatus==='all'){
								if(param.devicetype==='pc' && adapter.browserDetails.browser!=='safari'){
									let selecteddevice = sessionStorage.getItem('selectdevice');
									if(!selecteddevice || selecteddevice===''){
										sessionStorage.setItem('selectdevice', GLOBAL.transObjToStr({video: {label: videodevicelist[0].label, deviceId: videodevicelist[0].deviceId},
											audio: {label:audiodevicelist[0].label, deviceId: audiodevicelist[0].deviceId}}));
									}
								}
							}
						}
					}
					else {
						devicestatus = 'none';
					}
	
					if(param.callback){
						param.callback(devicestatus);
					}
				}).catch(function(error){
					if(param.callback){
						param.callback('none');
					}
				});
				return true;
			}
			else{
				return false;
			}
		};

		// 나중에 지워야 될 함수( 일단 현재는 Mobile에서 사용하고 있음.)
		this.checkDevice = function(param){
			if(adapter.browserDetails.browser==='safari'){
				if (navigator.mediaDevices){
					navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(function(streams){
						streams.getTracks().forEach(stream => stream.stop());
						navigator.mediaDevices.enumerateDevices().then(function(device){
							if(param.getDevice){
								param.getDevice(device);
							}
						}).catch(function(error){
							if(param.getDeviceFail){
								param.getDeviceFail(error);
							}
						});
					}).catch(function(error){
						if(param.getDeviceFail){
							param.getDeviceFail(error);
						}
					});
				}
			}
			else{
				if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices){
					navigator.mediaDevices.enumerateDevices().then(function(device){
						if(param.getDevice){
							param.getDevice(device);
						}
					}).catch(function(error){
						if(param.getDeviceFail){
							param.getDeviceFail(error);
						}
					});
				}
			}
		};
	
		this.getViewer = function(param){
			if(param){
				if(dummystream){
					this.viewersession[param.viewerid].addTrack(dummystream.getVideoTracks()[0], dummystream);
				}
			}
		};

		this.changeDevice = function(param){
			// change main session streams
			if(this.mainsession){
				this.mainsession.getSenders().forEach(function(mediasource){
					if(mediasource.track){
						mediasource.track.stop();
					}
				});
				this.getLocalMedia(param, function(param, streams){
					this.mainstream = streams;
	
					if(this.mainsession.getSenders()[0].replaceTrack){
						this.mainsession.getSenders().forEach(function(mediasource){
							if(mediasource.track){
								if(mediasource.track.kind==='video'){
									mediasource.replaceTrack(streams.getVideoTracks()[0]);
								}
								else{
									mediasource.replaceTrack(streams.getAudioTracks()[0]);
								}
							}
						});
						if(param.changeDevice){
							param.changeDevice(param);
						}
					}
					else{
						this.mainsession.getSenders().forEach(function(mediasource){
							if(mediasource.track){
								mediasource.track.stop();
								this.mainsession.removeTrack(mediasource);
							}
						}.bind(this));
						createPeerConnection(param);
						let tracks = streams.getTracks();
						for(let i=0; i < tracks.length; i++){
							this.mainsession.addTrack(tracks[i], streams);
						}
						createOffer(param);
					}
				}.bind(this, param), function(param, error){
					GLOBAL.error("Change Device Fail error = " + error.message);
				}.bind(this, param));
			}
			else{
				GLOBAL.error("Not Exist Main Session!!");
			}
		};
	
		//처음 회의 미디어화면 시작 - for 로비
		this.getLocalMedia = function(param, getLocalStream, getLocalStreamFail){
			if(navigator.mediaDevices.getUserMedia){
				let constraints = {};
				let videoconstraints = {};
				let audioconstraints = {};
				
				//devicetyp에 따라 constraints 값 전달
				if(param.devicetype==='pc'){
					// pc type get device  sampleRate: 48000,     sampleSize: 16,

					if(param.devicestatus==='all'){
						audioconstraints = { echoCancellation: true, noiseSuppression: true };
						if(param.audiodeviceid){
							audioconstraints.deviceId = {exact: param.audiodeviceid};
						}
						if(param.videodeviceid){
							// videoconstraints.frameRate = { min: 20, max: 25 };
							videoconstraints.deviceId = {exact: param.videodeviceid};
						}
					}
					else if(param.devicestatus==='videoonly'){
						if(param.videodeviceid){
							// videoconstraints.frameRate = { min: 20, max: 25 };
							videoconstraints.deviceId = {exact: param.videodeviceid};
						}
					}
					else if(param.devicestatus==='audioonly'){
						audioconstraints = { echoCancellation: true, noiseSuppression: true };
						if(param.audiodeviceid){
							audioconstraints.deviceId = {exact: param.audiodeviceid};
						}
					}
	
					if(Object.keys(videoconstraints).length === 0){
						if(param.devicestatus==='all' || param.devicestatus==='videoonly'){
							constraints.video = true;
						}
					}
					else{
						// if(adapter.browserDetails.browser==='safari'){
						//     videoconstraints.width = 1280;
						//     videoconstraints.height = 720;
						// }
						constraints.video = videoconstraints;
					}
	
					if(Object.keys(audioconstraints).length === 0){
						if(param.devicestatus==='all'||param.devicestatus==='audioonly'){
							constraints.audio = true;
						}
					}
					else{
						constraints.audio = audioconstraints;
					}
				}
				else if(param.devicetype==='mobile' || param.devicetype==='iOS' || param.devicetype==='Android'){
					// mobile type get device
					audioconstraints = { echoCancellation: true };
					if(param.audiodeviceid){
						audioconstraints.deviceId = {exact: param.audiodeviceid};
					}
					videoconstraints = { facingMode: { exact: (param.cameratype?(param.cameratype==="front"?"user":"environment"):"user") }};
	
					if(Object.keys(videoconstraints).length === 0){
						if(param.devicestatus==='all' || param.devicestatus==='videoonly'){
							constraints.video = true;
						}
					}
					else{
						constraints.video = videoconstraints;
					}
	
					if(Object.keys(audioconstraints).length === 0){
						if(param.devicestatus==='all'||param.devicestatus==='audioonly'){
							constraints.audio = true;
						}
					}
					else{
						constraints.audio = audioconstraints;
					}
				}
				else if(param.devicetype==='checkaudio'){
					constraints = {audio: true};
				}
				else if(param.devicetype==='checkvideo'){
					constraints = {video: true};
				}
	
				navigator.mediaDevices.getUserMedia(constraints).then(function(param, streams){
					if(getLocalStream){
						getLocalStream(streams, param);
					}
				}.bind(this, param)).catch(function(param, error){
					if(getLocalStreamFail){
						getLocalStreamFail(error, param);
					}
					let arr_devices = [];
					navigator.mediaDevices.enumerateDevices().then(function(devices){
						devices.forEach((val) => {
							if(val.kind === 'videoinput'){
								arr_devices.push(val);
							}
						});
						console.log('sori test all devices : ' + JSON.stringify(devices));
					});

				}.bind(this, param));
				return true;
			}
			return false;
		};
	
		let pcOnAddTrack = function(param, event){
			GLOBAL.error("OnAddTrack");
		};
	
		let pcOnDataChannel = function(param, event){
	
		};
	
		let pcOnIcecandidate = function(param, event){
			GLOBAL.info(`ICE candidate: ${event.candidate ? event.candidate.candidate : '(null)'}`);
		};
	
		let iceConnectionState = function(param, event){
			if (event.target.iceGatheringState === 'complete') {
			//	if (event.target.iceConnectionState === 'disconnected' || event.target.iceGatheringState === 'failed') {
				if (event.target.iceConnectionState === 'failed' || event.target.iceConnectionState === 'closed') { //by shlee	wait for iceconnection error failed
					GLOBAL.info("[" + param.type + "] iceconnection closed = ["+ event.target.iceConnectionState +"] ["+ event.target.iceGatheringState +"]");
					if(param.onFail){
						param.onFail({name: 'iceconnecterror', message: event.target.iceConnectionState, type: param.type});
					}
					restartICEConnect(param);				
				}
			}
		};
	
		let pcOnNegotiationNeeded = function(param, event){
			if(!this.negotiationneeded){
				this.negotiationneeded = true;
			}
		};
	
		let pcOnRemovestream = function(param, event){
	
		};
	
		let pcOnSignalingStatechange = function(param, event){
	
		};

		this.getCameraType = function(){
			let cameraStatus = "front";
			let videotrack = null;
			let senders = this.mainsession.getSenders();
			for(let i=0; i<senders.length; i++){
				if(senders[i].track.kind==="video"){
					videotrack = senders[i].track;
					break;
				}
			}
			if(videotrack){
				if(videotrack.getSettings().facingMode==="user"){
					return "front";
				}
				else{
					return "back";
				}
			}
		};

		return this;
	}
	
	module.exports = VideoCallEngine;
	
  },{"./webrtc-adapter":47}],47:[function(require,module,exports){

    (function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.adapter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      
      'use strict';
      
      var _adapter_factory = require('./adapter_factory.js');
      
      var adapter = (0, _adapter_factory.adapterFactory)({ window: typeof window === 'undefined' ? undefined : window });
      module.exports = adapter; // this is the difference from adapter_core.
      
      },{"./adapter_factory.js":2}],2:[function(require,module,exports){
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.adapterFactory = adapterFactory;
      
      var _utils = require('./utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      var _chrome_shim = require('./chrome/chrome_shim');
      
      var chromeShim = _interopRequireWildcard(_chrome_shim);
      
      var _edge_shim = require('./edge/edge_shim');
      
      var edgeShim = _interopRequireWildcard(_edge_shim);
      
      var _firefox_shim = require('./firefox/firefox_shim');
      
      var firefoxShim = _interopRequireWildcard(_firefox_shim);
      
      var _safari_shim = require('./safari/safari_shim');
      
      var safariShim = _interopRequireWildcard(_safari_shim);
      
      var _common_shim = require('./common_shim');
      
      var commonShim = _interopRequireWildcard(_common_shim);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      // Shimming starts here.
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      function adapterFactory() {
        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            window = _ref.window;
      
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          shimChrome: true,
          shimFirefox: true,
          shimEdge: true,
          shimSafari: true
        };
      
        // Utils.
        var logging = utils.log;
        var browserDetails = utils.detectBrowser(window);
      
        var adapter = {
          browserDetails: browserDetails,
          commonShim: commonShim,
          extractVersion: utils.extractVersion,
          disableLog: utils.disableLog,
          disableWarnings: utils.disableWarnings
        };
      
        // Shim browser if found.
        switch (browserDetails.browser) {
          case 'chrome':
            if (!chromeShim || !chromeShim.shimPeerConnection || !options.shimChrome) {
              logging('Chrome shim is not included in this adapter release.');
              return adapter;
            }
            if (browserDetails.version === null) {
              logging('Chrome shim can not determine version, not shimming.');
              return adapter;
            }
            logging('adapter.js shimming chrome.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = chromeShim;
      
            chromeShim.shimGetUserMedia(window);
            chromeShim.shimMediaStream(window);
            chromeShim.shimPeerConnection(window);
            chromeShim.shimOnTrack(window);
            chromeShim.shimAddTrackRemoveTrack(window);
            chromeShim.shimGetSendersWithDtmf(window);
            chromeShim.shimGetStats(window);
            chromeShim.shimSenderReceiverGetStats(window);
            chromeShim.fixNegotiationNeeded(window);
      
            commonShim.shimRTCIceCandidate(window);
            commonShim.shimConnectionState(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            commonShim.removeAllowExtmapMixed(window);
            break;
          case 'firefox':
            if (!firefoxShim || !firefoxShim.shimPeerConnection || !options.shimFirefox) {
              logging('Firefox shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming firefox.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = firefoxShim;
      
            firefoxShim.shimGetUserMedia(window);
            firefoxShim.shimPeerConnection(window);
            firefoxShim.shimOnTrack(window);
            firefoxShim.shimRemoveStream(window);
            firefoxShim.shimSenderGetStats(window);
            firefoxShim.shimReceiverGetStats(window);
            firefoxShim.shimRTCDataChannel(window);
            firefoxShim.shimAddTransceiver(window);
            firefoxShim.shimGetParameters(window);
            firefoxShim.shimCreateOffer(window);
            firefoxShim.shimCreateAnswer(window);
      
            commonShim.shimRTCIceCandidate(window);
            commonShim.shimConnectionState(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          case 'edge':
            if (!edgeShim || !edgeShim.shimPeerConnection || !options.shimEdge) {
              logging('MS edge shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming edge.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = edgeShim;
      
            edgeShim.shimGetUserMedia(window);
            edgeShim.shimGetDisplayMedia(window);
            edgeShim.shimPeerConnection(window);
            edgeShim.shimReplaceTrack(window);
      
            // the edge shim implements the full RTCIceCandidate object.
      
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            break;
          case 'safari':
            if (!safariShim || !options.shimSafari) {
              logging('Safari shim is not included in this adapter release.');
              return adapter;
            }
            logging('adapter.js shimming safari.');
            // Export to the adapter global object visible in the browser.
            adapter.browserShim = safariShim;
      
            safariShim.shimRTCIceServerUrls(window);
            safariShim.shimCreateOfferLegacy(window);
            safariShim.shimCallbacksAPI(window);
            safariShim.shimLocalStreamsAPI(window);
            safariShim.shimRemoteStreamsAPI(window);
            safariShim.shimTrackEventTransceiver(window);
            safariShim.shimGetUserMedia(window);
            safariShim.shimAudioContext(window);
      
            commonShim.shimRTCIceCandidate(window);
            commonShim.shimMaxMessageSize(window);
            commonShim.shimSendThrowTypeError(window);
            commonShim.removeAllowExtmapMixed(window);
            break;
          default:
            logging('Unsupported browser!');
            break;
        }
      
        return adapter;
      }
      
      // Browser shims.
      
      },{"./chrome/chrome_shim":3,"./common_shim":6,"./edge/edge_shim":7,"./firefox/firefox_shim":11,"./safari/safari_shim":14,"./utils":15}],3:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      var _getusermedia = require('./getusermedia');
      
      Object.defineProperty(exports, 'shimGetUserMedia', {
        enumerable: true,
        get: function get() {
          return _getusermedia.shimGetUserMedia;
        }
      });
      
      var _getdisplaymedia = require('./getdisplaymedia');
      
      Object.defineProperty(exports, 'shimGetDisplayMedia', {
        enumerable: true,
        get: function get() {
          return _getdisplaymedia.shimGetDisplayMedia;
        }
      });
      exports.shimMediaStream = shimMediaStream;
      exports.shimOnTrack = shimOnTrack;
      exports.shimGetSendersWithDtmf = shimGetSendersWithDtmf;
      exports.shimGetStats = shimGetStats;
      exports.shimSenderReceiverGetStats = shimSenderReceiverGetStats;
      exports.shimAddTrackRemoveTrackWithNative = shimAddTrackRemoveTrackWithNative;
      exports.shimAddTrackRemoveTrack = shimAddTrackRemoveTrack;
      exports.shimPeerConnection = shimPeerConnection;
      exports.fixNegotiationNeeded = fixNegotiationNeeded;
      
      var _utils = require('../utils.js');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      
      function shimMediaStream(window) {
        window.MediaStream = window.MediaStream || window.webkitMediaStream;
      }
      
      function shimOnTrack(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
            get: function get() {
              return this._ontrack;
            },
            set: function set(f) {
              if (this._ontrack) {
                this.removeEventListener('track', this._ontrack);
              }
              this.addEventListener('track', this._ontrack = f);
            },
      
            enumerable: true,
            configurable: true
          });
          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            var _this = this;
      
            if (!this._ontrackpoly) {
              this._ontrackpoly = function (e) {
                // onaddstream does not fire when a track is added to an existing
                // stream. But stream.onaddtrack is implemented so we use that.
                e.stream.addEventListener('addtrack', function (te) {
                  var receiver = void 0;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = _this.getReceivers().find(function (r) {
                      return r.track && r.track.id === te.track.id;
                    });
                  } else {
                    receiver = { track: te.track };
                  }
      
                  var event = new Event('track');
                  event.track = te.track;
                  event.receiver = receiver;
                  event.transceiver = { receiver: receiver };
                  event.streams = [e.stream];
                  _this.dispatchEvent(event);
                });
                e.stream.getTracks().forEach(function (track) {
                  var receiver = void 0;
                  if (window.RTCPeerConnection.prototype.getReceivers) {
                    receiver = _this.getReceivers().find(function (r) {
                      return r.track && r.track.id === track.id;
                    });
                  } else {
                    receiver = { track: track };
                  }
                  var event = new Event('track');
                  event.track = track;
                  event.receiver = receiver;
                  event.transceiver = { receiver: receiver };
                  event.streams = [e.stream];
                  _this.dispatchEvent(event);
                });
              };
              this.addEventListener('addstream', this._ontrackpoly);
            }
            return origSetRemoteDescription.apply(this, arguments);
          };
        } else {
          // even if RTCRtpTransceiver is in window, it is only used and
          // emitted in unified-plan. Unfortunately this means we need
          // to unconditionally wrap the event.
          utils.wrapPeerConnectionEvent(window, 'track', function (e) {
            if (!e.transceiver) {
              Object.defineProperty(e, 'transceiver', { value: { receiver: e.receiver } });
            }
            return e;
          });
        }
      }
      
      function shimGetSendersWithDtmf(window) {
        // Overrides addTrack/removeTrack, depends on shimAddTrackRemoveTrack.
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('getSenders' in window.RTCPeerConnection.prototype) && 'createDTMFSender' in window.RTCPeerConnection.prototype) {
          var shimSenderWithDtmf = function shimSenderWithDtmf(pc, track) {
            return {
              track: track,
              get dtmf() {
                if (this._dtmf === undefined) {
                  if (track.kind === 'audio') {
                    this._dtmf = pc.createDTMFSender(track);
                  } else {
                    this._dtmf = null;
                  }
                }
                return this._dtmf;
              },
              _pc: pc
            };
          };
      
          // augment addTrack when getSenders is not available.
          if (!window.RTCPeerConnection.prototype.getSenders) {
            window.RTCPeerConnection.prototype.getSenders = function getSenders() {
              this._senders = this._senders || [];
              return this._senders.slice(); // return a copy of the internal state.
            };
            var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
            window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
              var sender = origAddTrack.apply(this, arguments);
              if (!sender) {
                sender = shimSenderWithDtmf(this, track);
                this._senders.push(sender);
              }
              return sender;
            };
      
            var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
            window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
              origRemoveTrack.apply(this, arguments);
              var idx = this._senders.indexOf(sender);
              if (idx !== -1) {
                this._senders.splice(idx, 1);
              }
            };
          }
          var origAddStream = window.RTCPeerConnection.prototype.addStream;
          window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            var _this2 = this;
      
            this._senders = this._senders || [];
            origAddStream.apply(this, [stream]);
            stream.getTracks().forEach(function (track) {
              _this2._senders.push(shimSenderWithDtmf(_this2, track));
            });
          };
      
          var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
          window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
            var _this3 = this;
      
            this._senders = this._senders || [];
            origRemoveStream.apply(this, [stream]);
      
            stream.getTracks().forEach(function (track) {
              var sender = _this3._senders.find(function (s) {
                return s.track === track;
              });
              if (sender) {
                // remove sender
                _this3._senders.splice(_this3._senders.indexOf(sender), 1);
              }
            });
          };
        } else if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && 'getSenders' in window.RTCPeerConnection.prototype && 'createDTMFSender' in window.RTCPeerConnection.prototype && window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            var _this4 = this;
      
            var senders = origGetSenders.apply(this, []);
            senders.forEach(function (sender) {
              return sender._pc = _this4;
            });
            return senders;
          };
      
          Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
            get: function get() {
              if (this._dtmf === undefined) {
                if (this.track.kind === 'audio') {
                  this._dtmf = this._pc.createDTMFSender(this.track);
                } else {
                  this._dtmf = null;
                }
              }
              return this._dtmf;
            }
          });
        }
      }
      
      function shimGetStats(window) {
        if (!window.RTCPeerConnection) {
          return;
        }
      
        var origGetStats = window.RTCPeerConnection.prototype.getStats;
        window.RTCPeerConnection.prototype.getStats = function getStats() {
          var _this5 = this;
      
          var _arguments = Array.prototype.slice.call(arguments),
              selector = _arguments[0],
              onSucc = _arguments[1],
              onErr = _arguments[2];
      
          // If selector is a function then we are in the old style stats so just
          // pass back the original getStats format to avoid breaking old users.
      
      
          if (arguments.length > 0 && typeof selector === 'function') {
            return origGetStats.apply(this, arguments);
          }
      
          // When spec-style getStats is supported, return those when called with
          // either no arguments or the selector argument is null.
          if (origGetStats.length === 0 && (arguments.length === 0 || typeof selector !== 'function')) {
            return origGetStats.apply(this, []);
          }
      
          var fixChromeStats_ = function fixChromeStats_(response) {
            var standardReport = {};
            var reports = response.result();
            reports.forEach(function (report) {
              var standardStats = {
                id: report.id,
                timestamp: report.timestamp,
                type: {
                  localcandidate: 'local-candidate',
                  remotecandidate: 'remote-candidate'
                }[report.type] || report.type
              };
              report.names().forEach(function (name) {
                standardStats[name] = report.stat(name);
              });
              standardReport[standardStats.id] = standardStats;
            });
      
            return standardReport;
          };
      
          // shim getStats with maplike support
          var makeMapStats = function makeMapStats(stats) {
            return new Map(Object.keys(stats).map(function (key) {
              return [key, stats[key]];
            }));
          };
      
          if (arguments.length >= 2) {
            var successCallbackWrapper_ = function successCallbackWrapper_(response) {
              onSucc(makeMapStats(fixChromeStats_(response)));
            };
      
            return origGetStats.apply(this, [successCallbackWrapper_, selector]);
          }
      
          // promise-support
          return new Promise(function (resolve, reject) {
            origGetStats.apply(_this5, [function (response) {
              resolve(makeMapStats(fixChromeStats_(response)));
            }, reject]);
          }).then(onSucc, onErr);
        };
      }
      
      function shimSenderReceiverGetStats(window) {
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender && window.RTCRtpReceiver)) {
          return;
        }
      
        // shim sender stats.
        if (!('getStats' in window.RTCRtpSender.prototype)) {
          var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
          if (origGetSenders) {
            window.RTCPeerConnection.prototype.getSenders = function getSenders() {
              var _this6 = this;
      
              var senders = origGetSenders.apply(this, []);
              senders.forEach(function (sender) {
                return sender._pc = _this6;
              });
              return senders;
            };
          }
      
          var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
          if (origAddTrack) {
            window.RTCPeerConnection.prototype.addTrack = function addTrack() {
              var sender = origAddTrack.apply(this, arguments);
              sender._pc = this;
              return sender;
            };
          }
          window.RTCRtpSender.prototype.getStats = function getStats() {
            var sender = this;
            return this._pc.getStats().then(function (result) {
              return (
                /* Note: this will include stats of all senders that
                 *   send a track with the same id as sender.track as
                 *   it is not possible to identify the RTCRtpSender.
                 */
                utils.filterStats(result, sender.track, true)
              );
            });
          };
        }
      
        // shim receiver stats.
        if (!('getStats' in window.RTCRtpReceiver.prototype)) {
          var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
          if (origGetReceivers) {
            window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
              var _this7 = this;
      
              var receivers = origGetReceivers.apply(this, []);
              receivers.forEach(function (receiver) {
                return receiver._pc = _this7;
              });
              return receivers;
            };
          }
          utils.wrapPeerConnectionEvent(window, 'track', function (e) {
            e.receiver._pc = e.srcElement;
            return e;
          });
          window.RTCRtpReceiver.prototype.getStats = function getStats() {
            var receiver = this;
            return this._pc.getStats().then(function (result) {
              return utils.filterStats(result, receiver.track, false);
            });
          };
        }
      
        if (!('getStats' in window.RTCRtpSender.prototype && 'getStats' in window.RTCRtpReceiver.prototype)) {
          return;
        }
      
        // shim RTCPeerConnection.getStats(track).
        var origGetStats = window.RTCPeerConnection.prototype.getStats;
        window.RTCPeerConnection.prototype.getStats = function getStats() {
          if (arguments.length > 0 && arguments[0] instanceof window.MediaStreamTrack) {
            var track = arguments[0];
            var sender = void 0;
            var receiver = void 0;
            var err = void 0;
            this.getSenders().forEach(function (s) {
              if (s.track === track) {
                if (sender) {
                  err = true;
                } else {
                  sender = s;
                }
              }
            });
            this.getReceivers().forEach(function (r) {
              if (r.track === track) {
                if (receiver) {
                  err = true;
                } else {
                  receiver = r;
                }
              }
              return r.track === track;
            });
            if (err || sender && receiver) {
              return Promise.reject(new DOMException('There are more than one sender or receiver for the track.', 'InvalidAccessError'));
            } else if (sender) {
              return sender.getStats();
            } else if (receiver) {
              return receiver.getStats();
            }
            return Promise.reject(new DOMException('There is no sender or receiver for the track.', 'InvalidAccessError'));
          }
          return origGetStats.apply(this, arguments);
        };
      }
      
      function shimAddTrackRemoveTrackWithNative(window) {
        // shim addTrack/removeTrack with native variants in order to make
        // the interactions with legacy getLocalStreams behave as in other browsers.
        // Keeps a mapping stream.id => [stream, rtpsenders...]
        window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
          var _this8 = this;
      
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          return Object.keys(this._shimmedLocalStreams).map(function (streamId) {
            return _this8._shimmedLocalStreams[streamId][0];
          });
        };
      
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
          if (!stream) {
            return origAddTrack.apply(this, arguments);
          }
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      
          var sender = origAddTrack.apply(this, arguments);
          if (!this._shimmedLocalStreams[stream.id]) {
            this._shimmedLocalStreams[stream.id] = [stream, sender];
          } else if (this._shimmedLocalStreams[stream.id].indexOf(sender) === -1) {
            this._shimmedLocalStreams[stream.id].push(sender);
          }
          return sender;
        };
      
        var origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          var _this9 = this;
      
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
      
          stream.getTracks().forEach(function (track) {
            var alreadyExists = _this9.getSenders().find(function (s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }
          });
          var existingSenders = this.getSenders();
          origAddStream.apply(this, arguments);
          var newSenders = this.getSenders().filter(function (newSender) {
            return existingSenders.indexOf(newSender) === -1;
          });
          this._shimmedLocalStreams[stream.id] = [stream].concat(newSenders);
        };
      
        var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          delete this._shimmedLocalStreams[stream.id];
          return origRemoveStream.apply(this, arguments);
        };
      
        var origRemoveTrack = window.RTCPeerConnection.prototype.removeTrack;
        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
          var _this10 = this;
      
          this._shimmedLocalStreams = this._shimmedLocalStreams || {};
          if (sender) {
            Object.keys(this._shimmedLocalStreams).forEach(function (streamId) {
              var idx = _this10._shimmedLocalStreams[streamId].indexOf(sender);
              if (idx !== -1) {
                _this10._shimmedLocalStreams[streamId].splice(idx, 1);
              }
              if (_this10._shimmedLocalStreams[streamId].length === 1) {
                delete _this10._shimmedLocalStreams[streamId];
              }
            });
          }
          return origRemoveTrack.apply(this, arguments);
        };
      }
      
      function shimAddTrackRemoveTrack(window) {
        if (!window.RTCPeerConnection) {
          return;
        }
        var browserDetails = utils.detectBrowser(window);
        // shim addTrack and removeTrack.
        if (window.RTCPeerConnection.prototype.addTrack && browserDetails.version >= 65) {
          return shimAddTrackRemoveTrackWithNative(window);
        }
      
        // also shim pc.getLocalStreams when addTrack is shimmed
        // to return the original streams.
        var origGetLocalStreams = window.RTCPeerConnection.prototype.getLocalStreams;
        window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
          var _this11 = this;
      
          var nativeStreams = origGetLocalStreams.apply(this);
          this._reverseStreams = this._reverseStreams || {};
          return nativeStreams.map(function (stream) {
            return _this11._reverseStreams[stream.id];
          });
        };
      
        var origAddStream = window.RTCPeerConnection.prototype.addStream;
        window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
          var _this12 = this;
      
          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};
      
          stream.getTracks().forEach(function (track) {
            var alreadyExists = _this12.getSenders().find(function (s) {
              return s.track === track;
            });
            if (alreadyExists) {
              throw new DOMException('Track already exists.', 'InvalidAccessError');
            }
          });
          // Add identity mapping for consistency with addTrack.
          // Unless this is being used with a stream from addTrack.
          if (!this._reverseStreams[stream.id]) {
            var newStream = new window.MediaStream(stream.getTracks());
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            stream = newStream;
          }
          origAddStream.apply(this, [stream]);
        };
      
        var origRemoveStream = window.RTCPeerConnection.prototype.removeStream;
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};
      
          origRemoveStream.apply(this, [this._streams[stream.id] || stream]);
          delete this._reverseStreams[this._streams[stream.id] ? this._streams[stream.id].id : stream.id];
          delete this._streams[stream.id];
        };
      
        window.RTCPeerConnection.prototype.addTrack = function addTrack(track, stream) {
          var _this13 = this;
      
          if (this.signalingState === 'closed') {
            throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
          }
          var streams = [].slice.call(arguments, 1);
          if (streams.length !== 1 || !streams[0].getTracks().find(function (t) {
            return t === track;
          })) {
            // this is not fully correct but all we can manage without
            // [[associated MediaStreams]] internal slot.
            throw new DOMException('The adapter.js addTrack polyfill only supports a single ' + ' stream which is associated with the specified track.', 'NotSupportedError');
          }
      
          var alreadyExists = this.getSenders().find(function (s) {
            return s.track === track;
          });
          if (alreadyExists) {
            throw new DOMException('Track already exists.', 'InvalidAccessError');
          }
      
          this._streams = this._streams || {};
          this._reverseStreams = this._reverseStreams || {};
          var oldStream = this._streams[stream.id];
          if (oldStream) {
            // this is using odd Chrome behaviour, use with caution:
            // https://bugs.chromium.org/p/webrtc/issues/detail?id=7815
            // Note: we rely on the high-level addTrack/dtmf shim to
            // create the sender with a dtmf sender.
            oldStream.addTrack(track);
      
            // Trigger ONN async.
            Promise.resolve().then(function () {
              _this13.dispatchEvent(new Event('negotiationneeded'));
            });
          } else {
            var newStream = new window.MediaStream([track]);
            this._streams[stream.id] = newStream;
            this._reverseStreams[newStream.id] = stream;
            this.addStream(newStream);
          }
          return this.getSenders().find(function (s) {
            return s.track === track;
          });
        };
      
        // replace the internal stream id with the external one and
        // vice versa.
        function replaceInternalStreamId(pc, description) {
          var sdp = description.sdp;
          Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(internalStream.id, 'g'), externalStream.id);
          });
          return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
          });
        }
        function replaceExternalStreamId(pc, description) {
          var sdp = description.sdp;
          Object.keys(pc._reverseStreams || []).forEach(function (internalId) {
            var externalStream = pc._reverseStreams[internalId];
            var internalStream = pc._streams[externalStream.id];
            sdp = sdp.replace(new RegExp(externalStream.id, 'g'), internalStream.id);
          });
          return new RTCSessionDescription({
            type: description.type,
            sdp: sdp
          });
        }
        ['createOffer', 'createAnswer'].forEach(function (method) {
          var nativeMethod = window.RTCPeerConnection.prototype[method];
          var methodObj = _defineProperty({}, method, function () {
            var _this14 = this;
      
            var args = arguments;
            var isLegacyCall = arguments.length && typeof arguments[0] === 'function';
            if (isLegacyCall) {
              return nativeMethod.apply(this, [function (description) {
                var desc = replaceInternalStreamId(_this14, description);
                args[0].apply(null, [desc]);
              }, function (err) {
                if (args[1]) {
                  args[1].apply(null, err);
                }
              }, arguments[2]]);
            }
            return nativeMethod.apply(this, arguments).then(function (description) {
              return replaceInternalStreamId(_this14, description);
            });
          });
          window.RTCPeerConnection.prototype[method] = methodObj[method];
        });
      
        var origSetLocalDescription = window.RTCPeerConnection.prototype.setLocalDescription;
        window.RTCPeerConnection.prototype.setLocalDescription = function setLocalDescription() {
          if (!arguments.length || !arguments[0].type) {
            return origSetLocalDescription.apply(this, arguments);
          }
          arguments[0] = replaceExternalStreamId(this, arguments[0]);
          return origSetLocalDescription.apply(this, arguments);
        };
      
        // TODO: mangle getStats: https://w3c.github.io/webrtc-stats/#dom-rtcmediastreamstats-streamidentifier
      
        var origLocalDescription = Object.getOwnPropertyDescriptor(window.RTCPeerConnection.prototype, 'localDescription');
        Object.defineProperty(window.RTCPeerConnection.prototype, 'localDescription', {
          get: function get() {
            var description = origLocalDescription.get.apply(this);
            if (description.type === '') {
              return description;
            }
            return replaceInternalStreamId(this, description);
          }
        });
      
        window.RTCPeerConnection.prototype.removeTrack = function removeTrack(sender) {
          var _this15 = this;
      
          if (this.signalingState === 'closed') {
            throw new DOMException('The RTCPeerConnection\'s signalingState is \'closed\'.', 'InvalidStateError');
          }
          // We can not yet check for sender instanceof RTCRtpSender
          // since we shim RTPSender. So we check if sender._pc is set.
          if (!sender._pc) {
            throw new DOMException('Argument 1 of RTCPeerConnection.removeTrack ' + 'does not implement interface RTCRtpSender.', 'TypeError');
          }
          var isLocal = sender._pc === this;
          if (!isLocal) {
            throw new DOMException('Sender was not created by this connection.', 'InvalidAccessError');
          }
      
          // Search for the native stream the senders track belongs to.
          this._streams = this._streams || {};
          var stream = void 0;
          Object.keys(this._streams).forEach(function (streamid) {
            var hasTrack = _this15._streams[streamid].getTracks().find(function (track) {
              return sender.track === track;
            });
            if (hasTrack) {
              stream = _this15._streams[streamid];
            }
          });
      
          if (stream) {
            if (stream.getTracks().length === 1) {
              // if this is the last track of the stream, remove the stream. This
              // takes care of any shimmed _senders.
              this.removeStream(this._reverseStreams[stream.id]);
            } else {
              // relying on the same odd chrome behaviour as above.
              stream.removeTrack(sender.track);
            }
            this.dispatchEvent(new Event('negotiationneeded'));
          }
        };
      }
      
      function shimPeerConnection(window) {
        var browserDetails = utils.detectBrowser(window);
      
        if (!window.RTCPeerConnection && window.webkitRTCPeerConnection) {
          // very basic support for old versions.
          window.RTCPeerConnection = window.webkitRTCPeerConnection;
        }
        if (!window.RTCPeerConnection) {
          return;
        }
      
        var addIceCandidateNullSupported = window.RTCPeerConnection.prototype.addIceCandidate.length === 0;
      
        // shim implicit creation of RTCSessionDescription/RTCIceCandidate
        if (browserDetails.version < 53) {
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            var methodObj = _defineProperty({}, method, function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            });
            window.RTCPeerConnection.prototype[method] = methodObj[method];
          });
        }
      
        // support for addIceCandidate(null or undefined)
        var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
        window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
          if (!addIceCandidateNullSupported && !arguments[0]) {
            if (arguments[1]) {
              arguments[1].apply(null);
            }
            return Promise.resolve();
          }
          // Firefox 68+ emits and processes {candidate: "", ...}, ignore
          // in older versions. Native support planned for Chrome M77.
          if (browserDetails.version < 78 && arguments[0] && arguments[0].candidate === '') {
            return Promise.resolve();
          }
          return nativeAddIceCandidate.apply(this, arguments);
        };
      }
      
      // Attempt to fix ONN in plan-b mode.
      function fixNegotiationNeeded(window) {
        var browserDetails = utils.detectBrowser(window);
        utils.wrapPeerConnectionEvent(window, 'negotiationneeded', function (e) {
          var pc = e.target;
          if (browserDetails.version < 72 || pc.getConfiguration && pc.getConfiguration().sdpSemantics === 'plan-b') {
            if (pc.signalingState !== 'stable') {
              return;
            }
          }
          return e;
        });
      }
      
      },{"../utils.js":15,"./getdisplaymedia":4,"./getusermedia":5}],4:[function(require,module,exports){
      /*
       *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = shimGetDisplayMedia;
      function shimGetDisplayMedia(window, getSourceId) {
        if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
          return;
        }
        if (!window.navigator.mediaDevices) {
          return;
        }
        // getSourceId is a function that returns a promise resolving with
        // the sourceId of the screen/window/tab to be shared.
        if (typeof getSourceId !== 'function') {
          console.error('shimGetDisplayMedia: getSourceId argument is not ' + 'a function');
          return;
        }
        window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
          return getSourceId(constraints).then(function (sourceId) {
            var widthSpecified = constraints.video && constraints.video.width;
            var heightSpecified = constraints.video && constraints.video.height;
            var frameRateSpecified = constraints.video && constraints.video.frameRate;
            constraints.video = {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sourceId,
                maxFrameRate: frameRateSpecified || 3
              }
            };
            if (widthSpecified) {
              constraints.video.mandatory.maxWidth = widthSpecified;
            }
            if (heightSpecified) {
              constraints.video.mandatory.maxHeight = heightSpecified;
            }
            return window.navigator.mediaDevices.getUserMedia(constraints);
          });
        };
      }
      
      },{}],5:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      exports.shimGetUserMedia = shimGetUserMedia;
      
      var _utils = require('../utils.js');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      var logging = utils.log;
      
      function shimGetUserMedia(window) {
        var navigator = window && window.navigator;
      
        if (!navigator.mediaDevices) {
          return;
        }
      
        var browserDetails = utils.detectBrowser(window);
      
        var constraintsToChrome_ = function constraintsToChrome_(c) {
          if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
            return c;
          }
          var cc = {};
          Object.keys(c).forEach(function (key) {
            if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
              return;
            }
            var r = _typeof(c[key]) === 'object' ? c[key] : { ideal: c[key] };
            if (r.exact !== undefined && typeof r.exact === 'number') {
              r.min = r.max = r.exact;
            }
            var oldname_ = function oldname_(prefix, name) {
              if (prefix) {
                return prefix + name.charAt(0).toUpperCase() + name.slice(1);
              }
              return name === 'deviceId' ? 'sourceId' : name;
            };
            if (r.ideal !== undefined) {
              cc.optional = cc.optional || [];
              var oc = {};
              if (typeof r.ideal === 'number') {
                oc[oldname_('min', key)] = r.ideal;
                cc.optional.push(oc);
                oc = {};
                oc[oldname_('max', key)] = r.ideal;
                cc.optional.push(oc);
              } else {
                oc[oldname_('', key)] = r.ideal;
                cc.optional.push(oc);
              }
            }
            if (r.exact !== undefined && typeof r.exact !== 'number') {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_('', key)] = r.exact;
            } else {
              ['min', 'max'].forEach(function (mix) {
                if (r[mix] !== undefined) {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_(mix, key)] = r[mix];
                }
              });
            }
          });
          if (c.advanced) {
            cc.optional = (cc.optional || []).concat(c.advanced);
          }
          return cc;
        };
      
        var shimConstraints_ = function shimConstraints_(constraints, func) {
          if (browserDetails.version >= 61) {
            return func(constraints);
          }
          constraints = JSON.parse(JSON.stringify(constraints));
          if (constraints && _typeof(constraints.audio) === 'object') {
            var remap = function remap(obj, a, b) {
              if (a in obj && !(b in obj)) {
                obj[b] = obj[a];
                delete obj[a];
              }
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            remap(constraints.audio, 'autoGainControl', 'googAutoGainControl');
            remap(constraints.audio, 'noiseSuppression', 'googNoiseSuppression');
            constraints.audio = constraintsToChrome_(constraints.audio);
          }
          if (constraints && _typeof(constraints.video) === 'object') {
            // Shim facingMode for mobile & surface pro.
            var face = constraints.video.facingMode;
            face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : { ideal: face });
            var getSupportedFacingModeLies = browserDetails.version < 66;
      
            if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode && !getSupportedFacingModeLies)) {
              delete constraints.video.facingMode;
              var matches = void 0;
              if (face.exact === 'environment' || face.ideal === 'environment') {
                matches = ['back', 'rear'];
              } else if (face.exact === 'user' || face.ideal === 'user') {
                matches = ['front'];
              }
              if (matches) {
                // Look for matches in label, or use last cam for back (typical).
                return navigator.mediaDevices.enumerateDevices().then(function (devices) {
                  devices = devices.filter(function (d) {
                    return d.kind === 'videoinput';
                  });
                  var dev = devices.find(function (d) {
                    return matches.some(function (match) {
                      return d.label.toLowerCase().includes(match);
                    });
                  });
                  if (!dev && devices.length && matches.includes('back')) {
                    dev = devices[devices.length - 1]; // more likely the back cam
                  }
                  if (dev) {
                    constraints.video.deviceId = face.exact ? { exact: dev.deviceId } : { ideal: dev.deviceId };
                  }
                  constraints.video = constraintsToChrome_(constraints.video);
                  logging('chrome: ' + JSON.stringify(constraints));
                  return func(constraints);
                });
              }
            }
            constraints.video = constraintsToChrome_(constraints.video);
          }
          logging('chrome: ' + JSON.stringify(constraints));
          return func(constraints);
        };
      
        var shimError_ = function shimError_(e) {
          if (browserDetails.version >= 64) {
            return e;
          }
          return {
            name: {
              PermissionDeniedError: 'NotAllowedError',
              PermissionDismissedError: 'NotAllowedError',
              InvalidStateError: 'NotAllowedError',
              DevicesNotFoundError: 'NotFoundError',
              ConstraintNotSatisfiedError: 'OverconstrainedError',
              TrackStartError: 'NotReadableError',
              MediaDeviceFailedDueToShutdown: 'NotAllowedError',
              MediaDeviceKillSwitchOn: 'NotAllowedError',
              TabCaptureError: 'AbortError',
              ScreenCaptureError: 'AbortError',
              DeviceCaptureError: 'AbortError'
            }[e.name] || e.name,
            message: e.message,
            constraint: e.constraint || e.constraintName,
            toString: function toString() {
              return this.name + (this.message && ': ') + this.message;
            }
          };
        };
      
        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
          shimConstraints_(constraints, function (c) {
            navigator.webkitGetUserMedia(c, onSuccess, function (e) {
              if (onError) {
                onError(shimError_(e));
              }
            });
          });
        };
        navigator.getUserMedia = getUserMedia_.bind(navigator);
      
        // Even though Chrome 45 has navigator.mediaDevices and a getUserMedia
        // function which returns a Promise, it does not accept spec-style
        // constraints.
        if (navigator.mediaDevices.getUserMedia) {
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (cs) {
            return shimConstraints_(cs, function (c) {
              return origGetUserMedia(c).then(function (stream) {
                if (c.audio && !stream.getAudioTracks().length || c.video && !stream.getVideoTracks().length) {
                  stream.getTracks().forEach(function (track) {
                    track.stop();
                  });
                  throw new DOMException('', 'NotFoundError');
                }
                return stream;
              }, function (e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }
      }
      
      },{"../utils.js":15}],6:[function(require,module,exports){
      /*
       *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      exports.shimRTCIceCandidate = shimRTCIceCandidate;
      exports.shimMaxMessageSize = shimMaxMessageSize;
      exports.shimSendThrowTypeError = shimSendThrowTypeError;
      exports.shimConnectionState = shimConnectionState;
      exports.removeAllowExtmapMixed = removeAllowExtmapMixed;
      
      var _sdp = require('sdp');
      
      var _sdp2 = _interopRequireDefault(_sdp);
      
      var _utils = require('./utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
      
      function shimRTCIceCandidate(window) {
        // foundation is arbitrarily chosen as an indicator for full support for
        // https://w3c.github.io/webrtc-pc/#rtcicecandidate-interface
        if (!window.RTCIceCandidate || window.RTCIceCandidate && 'foundation' in window.RTCIceCandidate.prototype) {
          return;
        }
      
        var NativeRTCIceCandidate = window.RTCIceCandidate;
        window.RTCIceCandidate = function RTCIceCandidate(args) {
          // Remove the a= which shouldn't be part of the candidate string.
          if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) === 'object' && args.candidate && args.candidate.indexOf('a=') === 0) {
            args = JSON.parse(JSON.stringify(args));
            args.candidate = args.candidate.substr(2);
          }
      
          if (args.candidate && args.candidate.length) {
            // Augment the native candidate with the parsed fields.
            var nativeCandidate = new NativeRTCIceCandidate(args);
            var parsedCandidate = _sdp2.default.parseCandidate(args.candidate);
            var augmentedCandidate = Object.assign(nativeCandidate, parsedCandidate);
      
            // Add a serializer that does not serialize the extra attributes.
            augmentedCandidate.toJSON = function toJSON() {
              return {
                candidate: augmentedCandidate.candidate,
                sdpMid: augmentedCandidate.sdpMid,
                sdpMLineIndex: augmentedCandidate.sdpMLineIndex,
                usernameFragment: augmentedCandidate.usernameFragment
              };
            };
            return augmentedCandidate;
          }
          return new NativeRTCIceCandidate(args);
        };
        window.RTCIceCandidate.prototype = NativeRTCIceCandidate.prototype;
      
        // Hook up the augmented candidate in onicecandidate and
        // addEventListener('icecandidate', ...)
        utils.wrapPeerConnectionEvent(window, 'icecandidate', function (e) {
          if (e.candidate) {
            Object.defineProperty(e, 'candidate', {
              value: new window.RTCIceCandidate(e.candidate),
              writable: 'false'
            });
          }
          return e;
        });
      }
      
      function shimMaxMessageSize(window) {
        if (!window.RTCPeerConnection) {
          return;
        }
        var browserDetails = utils.detectBrowser(window);
      
        if (!('sctp' in window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'sctp', {
            get: function get() {
              return typeof this._sctp === 'undefined' ? null : this._sctp;
            }
          });
        }
      
        var sctpInDescription = function sctpInDescription(description) {
          if (!description || !description.sdp) {
            return false;
          }
          var sections = _sdp2.default.splitSections(description.sdp);
          sections.shift();
          return sections.some(function (mediaSection) {
            var mLine = _sdp2.default.parseMLine(mediaSection);
            return mLine && mLine.kind === 'application' && mLine.protocol.indexOf('SCTP') !== -1;
          });
        };
      
        var getRemoteFirefoxVersion = function getRemoteFirefoxVersion(description) {
          // TODO: Is there a better solution for detecting Firefox?
          var match = description.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
          if (match === null || match.length < 2) {
            return -1;
          }
          var version = parseInt(match[1], 10);
          // Test for NaN (yes, this is ugly)
          return version !== version ? -1 : version;
        };
      
        var getCanSendMaxMessageSize = function getCanSendMaxMessageSize(remoteIsFirefox) {
          // Every implementation we know can send at least 64 KiB.
          // Note: Although Chrome is technically able to send up to 256 KiB, the
          //       data does not reach the other peer reliably.
          //       See: https://bugs.chromium.org/p/webrtc/issues/detail?id=8419
          var canSendMaxMessageSize = 65536;
          if (browserDetails.browser === 'firefox') {
            if (browserDetails.version < 57) {
              if (remoteIsFirefox === -1) {
                // FF < 57 will send in 16 KiB chunks using the deprecated PPID
                // fragmentation.
                canSendMaxMessageSize = 16384;
              } else {
                // However, other FF (and RAWRTC) can reassemble PPID-fragmented
                // messages. Thus, supporting ~2 GiB when sending.
                canSendMaxMessageSize = 2147483637;
              }
            } else if (browserDetails.version < 60) {
              // Currently, all FF >= 57 will reset the remote maximum message size
              // to the default value when a data channel is created at a later
              // stage. :(
              // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
              canSendMaxMessageSize = browserDetails.version === 57 ? 65535 : 65536;
            } else {
              // FF >= 60 supports sending ~2 GiB
              canSendMaxMessageSize = 2147483637;
            }
          }
          return canSendMaxMessageSize;
        };
      
        var getMaxMessageSize = function getMaxMessageSize(description, remoteIsFirefox) {
          // Note: 65536 bytes is the default value from the SDP spec. Also,
          //       every implementation we know supports receiving 65536 bytes.
          var maxMessageSize = 65536;
      
          // FF 57 has a slightly incorrect default remote max message size, so
          // we need to adjust it here to avoid a failure when sending.
          // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1425697
          if (browserDetails.browser === 'firefox' && browserDetails.version === 57) {
            maxMessageSize = 65535;
          }
      
          var match = _sdp2.default.matchPrefix(description.sdp, 'a=max-message-size:');
          if (match.length > 0) {
            maxMessageSize = parseInt(match[0].substr(19), 10);
          } else if (browserDetails.browser === 'firefox' && remoteIsFirefox !== -1) {
            // If the maximum message size is not present in the remote SDP and
            // both local and remote are Firefox, the remote peer can receive
            // ~2 GiB.
            maxMessageSize = 2147483637;
          }
          return maxMessageSize;
        };
      
        var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
          this._sctp = null;
          // Chrome decided to not expose .sctp in plan-b mode.
          // As usual, adapter.js has to do an 'ugly worakaround'
          // to cover up the mess.
          if (browserDetails.browser === 'chrome' && browserDetails.version >= 76) {
            var _getConfiguration = this.getConfiguration(),
                sdpSemantics = _getConfiguration.sdpSemantics;
      
            if (sdpSemantics === 'plan-b') {
              Object.defineProperty(this, 'sctp', {
                get: function get() {
                  return typeof this._sctp === 'undefined' ? null : this._sctp;
                },
      
                enumerable: true,
                configurable: true
              });
            }
          }
      
          if (sctpInDescription(arguments[0])) {
            // Check if the remote is FF.
            var isFirefox = getRemoteFirefoxVersion(arguments[0]);
      
            // Get the maximum message size the local peer is capable of sending
            var canSendMMS = getCanSendMaxMessageSize(isFirefox);
      
            // Get the maximum message size of the remote peer.
            var remoteMMS = getMaxMessageSize(arguments[0], isFirefox);
      
            // Determine final maximum message size
            var maxMessageSize = void 0;
            if (canSendMMS === 0 && remoteMMS === 0) {
              maxMessageSize = Number.POSITIVE_INFINITY;
            } else if (canSendMMS === 0 || remoteMMS === 0) {
              maxMessageSize = Math.max(canSendMMS, remoteMMS);
            } else {
              maxMessageSize = Math.min(canSendMMS, remoteMMS);
            }
      
            // Create a dummy RTCSctpTransport object and the 'maxMessageSize'
            // attribute.
            var sctp = {};
            Object.defineProperty(sctp, 'maxMessageSize', {
              get: function get() {
                return maxMessageSize;
              }
            });
            this._sctp = sctp;
          }
      
          return origSetRemoteDescription.apply(this, arguments);
        };
      }
      
      function shimSendThrowTypeError(window) {
        if (!(window.RTCPeerConnection && 'createDataChannel' in window.RTCPeerConnection.prototype)) {
          return;
        }
      
        // Note: Although Firefox >= 57 has a native implementation, the maximum
        //       message size can be reset for all data channels at a later stage.
        //       See: https://bugzilla.mozilla.org/show_bug.cgi?id=1426831
      
        function wrapDcSend(dc, pc) {
          var origDataChannelSend = dc.send;
          dc.send = function send() {
            var data = arguments[0];
            var length = data.length || data.size || data.byteLength;
            if (dc.readyState === 'open' && pc.sctp && length > pc.sctp.maxMessageSize) {
              throw new TypeError('Message too large (can send a maximum of ' + pc.sctp.maxMessageSize + ' bytes)');
            }
            return origDataChannelSend.apply(dc, arguments);
          };
        }
        var origCreateDataChannel = window.RTCPeerConnection.prototype.createDataChannel;
        window.RTCPeerConnection.prototype.createDataChannel = function createDataChannel() {
          var dataChannel = origCreateDataChannel.apply(this, arguments);
          wrapDcSend(dataChannel, this);
          return dataChannel;
        };
        utils.wrapPeerConnectionEvent(window, 'datachannel', function (e) {
          wrapDcSend(e.channel, e.target);
          return e;
        });
      }
      
      /* shims RTCConnectionState by pretending it is the same as iceConnectionState.
       * See https://bugs.chromium.org/p/webrtc/issues/detail?id=6145#c12
       * for why this is a valid hack in Chrome. In Firefox it is slightly incorrect
       * since DTLS failures would be hidden. See
       * https://bugzilla.mozilla.org/show_bug.cgi?id=1265827
       * for the Firefox tracking bug.
       */
      function shimConnectionState(window) {
        if (!window.RTCPeerConnection || 'connectionState' in window.RTCPeerConnection.prototype) {
          return;
        }
        var proto = window.RTCPeerConnection.prototype;
        Object.defineProperty(proto, 'connectionState', {
          get: function get() {
            return {
              completed: 'connected',
              checking: 'connecting'
            }[this.iceConnectionState] || this.iceConnectionState;
          },
      
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(proto, 'onconnectionstatechange', {
          get: function get() {
            return this._onconnectionstatechange || null;
          },
          set: function set(cb) {
            if (this._onconnectionstatechange) {
              this.removeEventListener('connectionstatechange', this._onconnectionstatechange);
              delete this._onconnectionstatechange;
            }
            if (cb) {
              this.addEventListener('connectionstatechange', this._onconnectionstatechange = cb);
            }
          },
      
          enumerable: true,
          configurable: true
        });
      
        ['setLocalDescription', 'setRemoteDescription'].forEach(function (method) {
          var origMethod = proto[method];
          proto[method] = function () {
            if (!this._connectionstatechangepoly) {
              this._connectionstatechangepoly = function (e) {
                var pc = e.target;
                if (pc._lastConnectionState !== pc.connectionState) {
                  pc._lastConnectionState = pc.connectionState;
                  var newEvent = new Event('connectionstatechange', e);
                  pc.dispatchEvent(newEvent);
                }
                return e;
              };
              this.addEventListener('iceconnectionstatechange', this._connectionstatechangepoly);
            }
            return origMethod.apply(this, arguments);
          };
        });
      }
      
      function removeAllowExtmapMixed(window) {
        /* remove a=extmap-allow-mixed for webrtc.org < M71 */
        if (!window.RTCPeerConnection) {
          return;
        }
        var browserDetails = utils.detectBrowser(window);
        if (browserDetails.browser === 'chrome' && browserDetails.version >= 71) {
          return;
        }
        if (browserDetails.browser === 'safari' && browserDetails.version >= 605) {
          return;
        }
        var nativeSRD = window.RTCPeerConnection.prototype.setRemoteDescription;
        window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription(desc) {
          if (desc && desc.sdp && desc.sdp.indexOf('\na=extmap-allow-mixed') !== -1) {
            desc.sdp = desc.sdp.split('\n').filter(function (line) {
              return line.trim() !== 'a=extmap-allow-mixed';
            }).join('\n');
          }
          return nativeSRD.apply(this, arguments);
        };
      }
      
      },{"./utils":15,"sdp":17}],7:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;
      
      var _getusermedia = require('./getusermedia');
      
      Object.defineProperty(exports, 'shimGetUserMedia', {
        enumerable: true,
        get: function get() {
          return _getusermedia.shimGetUserMedia;
        }
      });
      
      var _getdisplaymedia = require('./getdisplaymedia');
      
      Object.defineProperty(exports, 'shimGetDisplayMedia', {
        enumerable: true,
        get: function get() {
          return _getdisplaymedia.shimGetDisplayMedia;
        }
      });
      exports.shimPeerConnection = shimPeerConnection;
      exports.shimReplaceTrack = shimReplaceTrack;
      
      var _utils = require('../utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      var _filtericeservers = require('./filtericeservers');
      
      var _rtcpeerconnectionShim = require('rtcpeerconnection-shim');
      
      var _rtcpeerconnectionShim2 = _interopRequireDefault(_rtcpeerconnectionShim);
      
      function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function shimPeerConnection(window) {
        var browserDetails = utils.detectBrowser(window);
      
        if (window.RTCIceGatherer) {
          if (!window.RTCIceCandidate) {
            window.RTCIceCandidate = function RTCIceCandidate(args) {
              return args;
            };
          }
          if (!window.RTCSessionDescription) {
            window.RTCSessionDescription = function RTCSessionDescription(args) {
              return args;
            };
          }
          // this adds an additional event listener to MediaStrackTrack that signals
          // when a tracks enabled property was changed. Workaround for a bug in
          // addStream, see below. No longer required in 15025+
          if (browserDetails.version < 15025) {
            var origMSTEnabled = Object.getOwnPropertyDescriptor(window.MediaStreamTrack.prototype, 'enabled');
            Object.defineProperty(window.MediaStreamTrack.prototype, 'enabled', {
              set: function set(value) {
                origMSTEnabled.set.call(this, value);
                var ev = new Event('enabled');
                ev.enabled = value;
                this.dispatchEvent(ev);
              }
            });
          }
        }
      
        // ORTC defines the DTMF sender a bit different.
        // https://github.com/w3c/ortc/issues/714
        if (window.RTCRtpSender && !('dtmf' in window.RTCRtpSender.prototype)) {
          Object.defineProperty(window.RTCRtpSender.prototype, 'dtmf', {
            get: function get() {
              if (this._dtmf === undefined) {
                if (this.track.kind === 'audio') {
                  this._dtmf = new window.RTCDtmfSender(this);
                } else if (this.track.kind === 'video') {
                  this._dtmf = null;
                }
              }
              return this._dtmf;
            }
          });
        }
        // Edge currently only implements the RTCDtmfSender, not the
        // RTCDTMFSender alias. See http://draft.ortc.org/#rtcdtmfsender2*
        if (window.RTCDtmfSender && !window.RTCDTMFSender) {
          window.RTCDTMFSender = window.RTCDtmfSender;
        }
      
        var RTCPeerConnectionShim = (0, _rtcpeerconnectionShim2.default)(window, browserDetails.version);
        window.RTCPeerConnection = function RTCPeerConnection(config) {
          if (config && config.iceServers) {
            config.iceServers = (0, _filtericeservers.filterIceServers)(config.iceServers, browserDetails.version);
            utils.log('ICE servers after filtering:', config.iceServers);
          }
          return new RTCPeerConnectionShim(config);
        };
        window.RTCPeerConnection.prototype = RTCPeerConnectionShim.prototype;
      }
      
      function shimReplaceTrack(window) {
        // ORTC has replaceTrack -- https://github.com/w3c/ortc/issues/614
        if (window.RTCRtpSender && !('replaceTrack' in window.RTCRtpSender.prototype)) {
          window.RTCRtpSender.prototype.replaceTrack = window.RTCRtpSender.prototype.setTrack;
        }
      }
      
      },{"../utils":15,"./filtericeservers":8,"./getdisplaymedia":9,"./getusermedia":10,"rtcpeerconnection-shim":16}],8:[function(require,module,exports){
      /*
       *  Copyright (c) 2018 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.filterIceServers = filterIceServers;
      
      var _utils = require('../utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      // Edge does not like
      // 1) stun: filtered after 14393 unless ?transport=udp is present
      // 2) turn: that does not have all of turn:host:port?transport=udp
      // 3) turn: with ipv6 addresses
      // 4) turn: occurring muliple times
      function filterIceServers(iceServers, edgeVersion) {
        var hasTurn = false;
        iceServers = JSON.parse(JSON.stringify(iceServers));
        return iceServers.filter(function (server) {
          if (server && (server.urls || server.url)) {
            var urls = server.urls || server.url;
            if (server.url && !server.urls) {
              utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
            }
            var isString = typeof urls === 'string';
            if (isString) {
              urls = [urls];
            }
            urls = urls.filter(function (url) {
              // filter STUN unconditionally.
              if (url.indexOf('stun:') === 0) {
                return false;
              }
      
              var validTurn = url.startsWith('turn') && !url.startsWith('turn:[') && url.includes('transport=udp');
              if (validTurn && !hasTurn) {
                hasTurn = true;
                return true;
              }
              return validTurn && !hasTurn;
            });
      
            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
          }
        });
      }
      
      },{"../utils":15}],9:[function(require,module,exports){
      /*
       *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = shimGetDisplayMedia;
      function shimGetDisplayMedia(window) {
        if (!('getDisplayMedia' in window.navigator)) {
          return;
        }
        if (!window.navigator.mediaDevices) {
          return;
        }
        if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
          return;
        }
        window.navigator.mediaDevices.getDisplayMedia = window.navigator.getDisplayMedia.bind(window.navigator);
      }
      
      },{}],10:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetUserMedia = shimGetUserMedia;
      function shimGetUserMedia(window) {
        var navigator = window && window.navigator;
      
        var shimError_ = function shimError_(e) {
          return {
            name: { PermissionDeniedError: 'NotAllowedError' }[e.name] || e.name,
            message: e.message,
            constraint: e.constraint,
            toString: function toString() {
              return this.name;
            }
          };
        };
      
        // getUserMedia error shim.
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function (c) {
          return origGetUserMedia(c).catch(function (e) {
            return Promise.reject(shimError_(e));
          });
        };
      }
      
      },{}],11:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = exports.shimGetUserMedia = undefined;
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      var _getusermedia = require('./getusermedia');
      
      Object.defineProperty(exports, 'shimGetUserMedia', {
        enumerable: true,
        get: function get() {
          return _getusermedia.shimGetUserMedia;
        }
      });
      
      var _getdisplaymedia = require('./getdisplaymedia');
      
      Object.defineProperty(exports, 'shimGetDisplayMedia', {
        enumerable: true,
        get: function get() {
          return _getdisplaymedia.shimGetDisplayMedia;
        }
      });
      exports.shimOnTrack = shimOnTrack;
      exports.shimPeerConnection = shimPeerConnection;
      exports.shimSenderGetStats = shimSenderGetStats;
      exports.shimReceiverGetStats = shimReceiverGetStats;
      exports.shimRemoveStream = shimRemoveStream;
      exports.shimRTCDataChannel = shimRTCDataChannel;
      exports.shimAddTransceiver = shimAddTransceiver;
      exports.shimGetParameters = shimGetParameters;
      exports.shimCreateOffer = shimCreateOffer;
      exports.shimCreateAnswer = shimCreateAnswer;
      
      var _utils = require('../utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      
      function shimOnTrack(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
          Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
            get: function get() {
              return { receiver: this.receiver };
            }
          });
        }
      }
      
      function shimPeerConnection(window) {
        var browserDetails = utils.detectBrowser(window);
      
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
          return; // probably media.peerconnection.enabled=false in about:config
        }
        if (!window.RTCPeerConnection && window.mozRTCPeerConnection) {
          // very basic support for old versions.
          window.RTCPeerConnection = window.mozRTCPeerConnection;
        }
      
        if (browserDetails.version < 53) {
          // shim away need for obsolete RTCIceCandidate/RTCSessionDescription.
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function (method) {
            var nativeMethod = window.RTCPeerConnection.prototype[method];
            var methodObj = _defineProperty({}, method, function () {
              arguments[0] = new (method === 'addIceCandidate' ? window.RTCIceCandidate : window.RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            });
            window.RTCPeerConnection.prototype[method] = methodObj[method];
          });
        }
      
        // support for addIceCandidate(null or undefined)
        // as well as ignoring {sdpMid, candidate: ""}
        if (browserDetails.version < 68) {
          var nativeAddIceCandidate = window.RTCPeerConnection.prototype.addIceCandidate;
          window.RTCPeerConnection.prototype.addIceCandidate = function addIceCandidate() {
            if (!arguments[0]) {
              if (arguments[1]) {
                arguments[1].apply(null);
              }
              return Promise.resolve();
            }
            // Firefox 68+ emits and processes {candidate: "", ...}, ignore
            // in older versions.
            if (arguments[0] && arguments[0].candidate === '') {
              return Promise.resolve();
            }
            return nativeAddIceCandidate.apply(this, arguments);
          };
        }
      
        var modernStatsTypes = {
          inboundrtp: 'inbound-rtp',
          outboundrtp: 'outbound-rtp',
          candidatepair: 'candidate-pair',
          localcandidate: 'local-candidate',
          remotecandidate: 'remote-candidate'
        };
      
        var nativeGetStats = window.RTCPeerConnection.prototype.getStats;
        window.RTCPeerConnection.prototype.getStats = function getStats() {
          var _arguments = Array.prototype.slice.call(arguments),
              selector = _arguments[0],
              onSucc = _arguments[1],
              onErr = _arguments[2];
      
          return nativeGetStats.apply(this, [selector || null]).then(function (stats) {
            if (browserDetails.version < 53 && !onSucc) {
              // Shim only promise getStats with spec-hyphens in type names
              // Leave callback version alone; misc old uses of forEach before Map
              try {
                stats.forEach(function (stat) {
                  stat.type = modernStatsTypes[stat.type] || stat.type;
                });
              } catch (e) {
                if (e.name !== 'TypeError') {
                  throw e;
                }
                // Avoid TypeError: "type" is read-only, in old versions. 34-43ish
                stats.forEach(function (stat, i) {
                  stats.set(i, Object.assign({}, stat, {
                    type: modernStatsTypes[stat.type] || stat.type
                  }));
                });
              }
            }
            return stats;
          }).then(onSucc, onErr);
        };
      }
      
      function shimSenderGetStats(window) {
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
          return;
        }
        if (window.RTCRtpSender && 'getStats' in window.RTCRtpSender.prototype) {
          return;
        }
        var origGetSenders = window.RTCPeerConnection.prototype.getSenders;
        if (origGetSenders) {
          window.RTCPeerConnection.prototype.getSenders = function getSenders() {
            var _this = this;
      
            var senders = origGetSenders.apply(this, []);
            senders.forEach(function (sender) {
              return sender._pc = _this;
            });
            return senders;
          };
        }
      
        var origAddTrack = window.RTCPeerConnection.prototype.addTrack;
        if (origAddTrack) {
          window.RTCPeerConnection.prototype.addTrack = function addTrack() {
            var sender = origAddTrack.apply(this, arguments);
            sender._pc = this;
            return sender;
          };
        }
        window.RTCRtpSender.prototype.getStats = function getStats() {
          return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map());
        };
      }
      
      function shimReceiverGetStats(window) {
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && window.RTCRtpSender)) {
          return;
        }
        if (window.RTCRtpSender && 'getStats' in window.RTCRtpReceiver.prototype) {
          return;
        }
        var origGetReceivers = window.RTCPeerConnection.prototype.getReceivers;
        if (origGetReceivers) {
          window.RTCPeerConnection.prototype.getReceivers = function getReceivers() {
            var _this2 = this;
      
            var receivers = origGetReceivers.apply(this, []);
            receivers.forEach(function (receiver) {
              return receiver._pc = _this2;
            });
            return receivers;
          };
        }
        utils.wrapPeerConnectionEvent(window, 'track', function (e) {
          e.receiver._pc = e.srcElement;
          return e;
        });
        window.RTCRtpReceiver.prototype.getStats = function getStats() {
          return this._pc.getStats(this.track);
        };
      }
      
      function shimRemoveStream(window) {
        if (!window.RTCPeerConnection || 'removeStream' in window.RTCPeerConnection.prototype) {
          return;
        }
        window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
          var _this3 = this;
      
          utils.deprecated('removeStream', 'removeTrack');
          this.getSenders().forEach(function (sender) {
            if (sender.track && stream.getTracks().includes(sender.track)) {
              _this3.removeTrack(sender);
            }
          });
        };
      }
      
      function shimRTCDataChannel(window) {
        // rename DataChannel to RTCDataChannel (native fix in FF60):
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1173851
        if (window.DataChannel && !window.RTCDataChannel) {
          window.RTCDataChannel = window.DataChannel;
        }
      }
      
      function shimAddTransceiver(window) {
        // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
        // Firefox ignores the init sendEncodings options passed to addTransceiver
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
          return;
        }
        var origAddTransceiver = window.RTCPeerConnection.prototype.addTransceiver;
        if (origAddTransceiver) {
          window.RTCPeerConnection.prototype.addTransceiver = function addTransceiver() {
            this.setParametersPromises = [];
            var initParameters = arguments[1];
            var shouldPerformCheck = initParameters && 'sendEncodings' in initParameters;
            if (shouldPerformCheck) {
              // If sendEncodings params are provided, validate grammar
              initParameters.sendEncodings.forEach(function (encodingParam) {
                if ('rid' in encodingParam) {
                  var ridRegex = /^[a-z0-9]{0,16}$/i;
                  if (!ridRegex.test(encodingParam.rid)) {
                    throw new TypeError('Invalid RID value provided.');
                  }
                }
                if ('scaleResolutionDownBy' in encodingParam) {
                  if (!(parseFloat(encodingParam.scaleResolutionDownBy) >= 1.0)) {
                    throw new RangeError('scale_resolution_down_by must be >= 1.0');
                  }
                }
                if ('maxFramerate' in encodingParam) {
                  if (!(parseFloat(encodingParam.maxFramerate) >= 0)) {
                    throw new RangeError('max_framerate must be >= 0.0');
                  }
                }
              });
            }
            var transceiver = origAddTransceiver.apply(this, arguments);
            if (shouldPerformCheck) {
              // Check if the init options were applied. If not we do this in an
              // asynchronous way and save the promise reference in a global object.
              // This is an ugly hack, but at the same time is way more robust than
              // checking the sender parameters before and after the createOffer
              // Also note that after the createoffer we are not 100% sure that
              // the params were asynchronously applied so we might miss the
              // opportunity to recreate offer.
              var sender = transceiver.sender;
      
              var params = sender.getParameters();
              if (!('encodings' in params) ||
              // Avoid being fooled by patched getParameters() below.
              params.encodings.length === 1 && Object.keys(params.encodings[0]).length === 0) {
                params.encodings = initParameters.sendEncodings;
                sender.sendEncodings = initParameters.sendEncodings;
                this.setParametersPromises.push(sender.setParameters(params).then(function () {
                  delete sender.sendEncodings;
                }).catch(function () {
                  delete sender.sendEncodings;
                }));
              }
            }
            return transceiver;
          };
        }
      }
      
      function shimGetParameters(window) {
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCRtpSender)) {
          return;
        }
        var origGetParameters = window.RTCRtpSender.prototype.getParameters;
        if (origGetParameters) {
          window.RTCRtpSender.prototype.getParameters = function getParameters() {
            var params = origGetParameters.apply(this, arguments);
            if (!('encodings' in params)) {
              params.encodings = [].concat(this.sendEncodings || [{}]);
            }
            return params;
          };
        }
      }
      
      function shimCreateOffer(window) {
        // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
        // Firefox ignores the init sendEncodings options passed to addTransceiver
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
          return;
        }
        var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
        window.RTCPeerConnection.prototype.createOffer = function createOffer() {
          var _this4 = this,
              _arguments2 = arguments;
      
          if (this.setParametersPromises && this.setParametersPromises.length) {
            return Promise.all(this.setParametersPromises).then(function () {
              return origCreateOffer.apply(_this4, _arguments2);
            }).finally(function () {
              _this4.setParametersPromises = [];
            });
          }
          return origCreateOffer.apply(this, arguments);
        };
      }
      
      function shimCreateAnswer(window) {
        // https://github.com/webrtcHacks/adapter/issues/998#issuecomment-516921647
        // Firefox ignores the init sendEncodings options passed to addTransceiver
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1396918
        if (!((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection)) {
          return;
        }
        var origCreateAnswer = window.RTCPeerConnection.prototype.createAnswer;
        window.RTCPeerConnection.prototype.createAnswer = function createAnswer() {
          var _this5 = this,
              _arguments3 = arguments;
      
          if (this.setParametersPromises && this.setParametersPromises.length) {
            return Promise.all(this.setParametersPromises).then(function () {
              return origCreateAnswer.apply(_this5, _arguments3);
            }).finally(function () {
              _this5.setParametersPromises = [];
            });
          }
          return origCreateAnswer.apply(this, arguments);
        };
      }
      
      },{"../utils":15,"./getdisplaymedia":12,"./getusermedia":13}],12:[function(require,module,exports){
      /*
       *  Copyright (c) 2018 The adapter.js project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shimGetDisplayMedia = shimGetDisplayMedia;
      function shimGetDisplayMedia(window, preferredMediaSource) {
        if (window.navigator.mediaDevices && 'getDisplayMedia' in window.navigator.mediaDevices) {
          return;
        }
        if (!window.navigator.mediaDevices) {
          return;
        }
        window.navigator.mediaDevices.getDisplayMedia = function getDisplayMedia(constraints) {
          if (!(constraints && constraints.video)) {
            var err = new DOMException('getDisplayMedia without video ' + 'constraints is undefined');
            err.name = 'NotFoundError';
            // from https://heycam.github.io/webidl/#idl-DOMException-error-names
            err.code = 8;
            return Promise.reject(err);
          }
          if (constraints.video === true) {
            constraints.video = { mediaSource: preferredMediaSource };
          } else {
            constraints.video.mediaSource = preferredMediaSource;
          }
          return window.navigator.mediaDevices.getUserMedia(constraints);
        };
      }
      
      },{}],13:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      exports.shimGetUserMedia = shimGetUserMedia;
      
      var _utils = require('../utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function shimGetUserMedia(window) {
        var browserDetails = utils.detectBrowser(window);
        var navigator = window && window.navigator;
        var MediaStreamTrack = window && window.MediaStreamTrack;
      
        navigator.getUserMedia = function (constraints, onSuccess, onError) {
          // Replace Firefox 44+'s deprecation warning with unprefixed version.
          utils.deprecated('navigator.getUserMedia', 'navigator.mediaDevices.getUserMedia');
          navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
        };
      
        if (!(browserDetails.version > 55 && 'autoGainControl' in navigator.mediaDevices.getSupportedConstraints())) {
          var remap = function remap(obj, a, b) {
            if (a in obj && !(b in obj)) {
              obj[b] = obj[a];
              delete obj[a];
            }
          };
      
          var nativeGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function (c) {
            if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object' && _typeof(c.audio) === 'object') {
              c = JSON.parse(JSON.stringify(c));
              remap(c.audio, 'autoGainControl', 'mozAutoGainControl');
              remap(c.audio, 'noiseSuppression', 'mozNoiseSuppression');
            }
            return nativeGetUserMedia(c);
          };
      
          if (MediaStreamTrack && MediaStreamTrack.prototype.getSettings) {
            var nativeGetSettings = MediaStreamTrack.prototype.getSettings;
            MediaStreamTrack.prototype.getSettings = function () {
              var obj = nativeGetSettings.apply(this, arguments);
              remap(obj, 'mozAutoGainControl', 'autoGainControl');
              remap(obj, 'mozNoiseSuppression', 'noiseSuppression');
              return obj;
            };
          }
      
          if (MediaStreamTrack && MediaStreamTrack.prototype.applyConstraints) {
            var nativeApplyConstraints = MediaStreamTrack.prototype.applyConstraints;
            MediaStreamTrack.prototype.applyConstraints = function (c) {
              if (this.kind === 'audio' && (typeof c === 'undefined' ? 'undefined' : _typeof(c)) === 'object') {
                c = JSON.parse(JSON.stringify(c));
                remap(c, 'autoGainControl', 'mozAutoGainControl');
                remap(c, 'noiseSuppression', 'mozNoiseSuppression');
              }
              return nativeApplyConstraints.apply(this, [c]);
            };
          }
        }
      }
      
      },{"../utils":15}],14:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      exports.shimLocalStreamsAPI = shimLocalStreamsAPI;
      exports.shimRemoteStreamsAPI = shimRemoteStreamsAPI;
      exports.shimCallbacksAPI = shimCallbacksAPI;
      exports.shimGetUserMedia = shimGetUserMedia;
      exports.shimConstraints = shimConstraints;
      exports.shimRTCIceServerUrls = shimRTCIceServerUrls;
      exports.shimTrackEventTransceiver = shimTrackEventTransceiver;
      exports.shimCreateOfferLegacy = shimCreateOfferLegacy;
      exports.shimAudioContext = shimAudioContext;
      
      var _utils = require('../utils');
      
      var utils = _interopRequireWildcard(_utils);
      
      function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
      
      function shimLocalStreamsAPI(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        if (!('getLocalStreams' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.getLocalStreams = function getLocalStreams() {
            if (!this._localStreams) {
              this._localStreams = [];
            }
            return this._localStreams;
          };
        }
        if (!('addStream' in window.RTCPeerConnection.prototype)) {
          var _addTrack = window.RTCPeerConnection.prototype.addTrack;
          window.RTCPeerConnection.prototype.addStream = function addStream(stream) {
            var _this = this;
      
            if (!this._localStreams) {
              this._localStreams = [];
            }
            if (!this._localStreams.includes(stream)) {
              this._localStreams.push(stream);
            }
            // Try to emulate Chrome's behaviour of adding in audio-video order.
            // Safari orders by track id.
            stream.getAudioTracks().forEach(function (track) {
              return _addTrack.call(_this, track, stream);
            });
            stream.getVideoTracks().forEach(function (track) {
              return _addTrack.call(_this, track, stream);
            });
          };
      
          window.RTCPeerConnection.prototype.addTrack = function addTrack(track) {
            var _this2 = this;
      
            for (var _len = arguments.length, streams = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              streams[_key - 1] = arguments[_key];
            }
      
            if (streams) {
              streams.forEach(function (stream) {
                if (!_this2._localStreams) {
                  _this2._localStreams = [stream];
                } else if (!_this2._localStreams.includes(stream)) {
                  _this2._localStreams.push(stream);
                }
              });
            }
            return _addTrack.apply(this, arguments);
          };
        }
        if (!('removeStream' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.removeStream = function removeStream(stream) {
            var _this3 = this;
      
            if (!this._localStreams) {
              this._localStreams = [];
            }
            var index = this._localStreams.indexOf(stream);
            if (index === -1) {
              return;
            }
            this._localStreams.splice(index, 1);
            var tracks = stream.getTracks();
            this.getSenders().forEach(function (sender) {
              if (tracks.includes(sender.track)) {
                _this3.removeTrack(sender);
              }
            });
          };
        }
      }
      
      function shimRemoteStreamsAPI(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        if (!('getRemoteStreams' in window.RTCPeerConnection.prototype)) {
          window.RTCPeerConnection.prototype.getRemoteStreams = function getRemoteStreams() {
            return this._remoteStreams ? this._remoteStreams : [];
          };
        }
        if (!('onaddstream' in window.RTCPeerConnection.prototype)) {
          Object.defineProperty(window.RTCPeerConnection.prototype, 'onaddstream', {
            get: function get() {
              return this._onaddstream;
            },
            set: function set(f) {
              var _this4 = this;
      
              if (this._onaddstream) {
                this.removeEventListener('addstream', this._onaddstream);
                this.removeEventListener('track', this._onaddstreampoly);
              }
              this.addEventListener('addstream', this._onaddstream = f);
              this.addEventListener('track', this._onaddstreampoly = function (e) {
                e.streams.forEach(function (stream) {
                  if (!_this4._remoteStreams) {
                    _this4._remoteStreams = [];
                  }
                  if (_this4._remoteStreams.includes(stream)) {
                    return;
                  }
                  _this4._remoteStreams.push(stream);
                  var event = new Event('addstream');
                  event.stream = stream;
                  _this4.dispatchEvent(event);
                });
              });
            }
          });
          var origSetRemoteDescription = window.RTCPeerConnection.prototype.setRemoteDescription;
          window.RTCPeerConnection.prototype.setRemoteDescription = function setRemoteDescription() {
            var pc = this;
            if (!this._onaddstreampoly) {
              this.addEventListener('track', this._onaddstreampoly = function (e) {
                e.streams.forEach(function (stream) {
                  if (!pc._remoteStreams) {
                    pc._remoteStreams = [];
                  }
                  if (pc._remoteStreams.indexOf(stream) >= 0) {
                    return;
                  }
                  pc._remoteStreams.push(stream);
                  var event = new Event('addstream');
                  event.stream = stream;
                  pc.dispatchEvent(event);
                });
              });
            }
            return origSetRemoteDescription.apply(pc, arguments);
          };
        }
      }
      
      function shimCallbacksAPI(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !window.RTCPeerConnection) {
          return;
        }
        var prototype = window.RTCPeerConnection.prototype;
        var origCreateOffer = prototype.createOffer;
        var origCreateAnswer = prototype.createAnswer;
        var setLocalDescription = prototype.setLocalDescription;
        var setRemoteDescription = prototype.setRemoteDescription;
        var addIceCandidate = prototype.addIceCandidate;
      
        prototype.createOffer = function createOffer(successCallback, failureCallback) {
          var options = arguments.length >= 2 ? arguments[2] : arguments[0];
          var promise = origCreateOffer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
      
        prototype.createAnswer = function createAnswer(successCallback, failureCallback) {
          var options = arguments.length >= 2 ? arguments[2] : arguments[0];
          var promise = origCreateAnswer.apply(this, [options]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
      
        var withCallback = function withCallback(description, successCallback, failureCallback) {
          var promise = setLocalDescription.apply(this, [description]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.setLocalDescription = withCallback;
      
        withCallback = function withCallback(description, successCallback, failureCallback) {
          var promise = setRemoteDescription.apply(this, [description]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.setRemoteDescription = withCallback;
      
        withCallback = function withCallback(candidate, successCallback, failureCallback) {
          var promise = addIceCandidate.apply(this, [candidate]);
          if (!failureCallback) {
            return promise;
          }
          promise.then(successCallback, failureCallback);
          return Promise.resolve();
        };
        prototype.addIceCandidate = withCallback;
      }
      
      function shimGetUserMedia(window) {
        var navigator = window && window.navigator;
      
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          // shim not needed in Safari 12.1
          var mediaDevices = navigator.mediaDevices;
          var _getUserMedia = mediaDevices.getUserMedia.bind(mediaDevices);
          navigator.mediaDevices.getUserMedia = function (constraints) {
            return _getUserMedia(shimConstraints(constraints));
          };
        }
      
        if (!navigator.getUserMedia && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.getUserMedia = function getUserMedia(constraints, cb, errcb) {
            navigator.mediaDevices.getUserMedia(constraints).then(cb, errcb);
          }.bind(navigator);
        }
      }
      
      function shimConstraints(constraints) {
        if (constraints && constraints.video !== undefined) {
          return Object.assign({}, constraints, { video: utils.compactObject(constraints.video) });
        }
      
        return constraints;
      }
      
      function shimRTCIceServerUrls(window) {
        if (!window.RTCPeerConnection) {
          return;
        }
        // migrate from non-spec RTCIceServer.url to RTCIceServer.urls
        var OrigPeerConnection = window.RTCPeerConnection;
        window.RTCPeerConnection = function RTCPeerConnection(pcConfig, pcConstraints) {
          if (pcConfig && pcConfig.iceServers) {
            var newIceServers = [];
            for (var i = 0; i < pcConfig.iceServers.length; i++) {
              var server = pcConfig.iceServers[i];
              if (!server.hasOwnProperty('urls') && server.hasOwnProperty('url')) {
                utils.deprecated('RTCIceServer.url', 'RTCIceServer.urls');
                server = JSON.parse(JSON.stringify(server));
                server.urls = server.url;
                delete server.url;
                newIceServers.push(server);
              } else {
                newIceServers.push(pcConfig.iceServers[i]);
              }
            }
            pcConfig.iceServers = newIceServers;
          }
          return new OrigPeerConnection(pcConfig, pcConstraints);
        };
        window.RTCPeerConnection.prototype = OrigPeerConnection.prototype;
        // wrap static methods. Currently just generateCertificate.
        if ('generateCertificate' in OrigPeerConnection) {
          Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {
            get: function get() {
              return OrigPeerConnection.generateCertificate;
            }
          });
        }
      }
      
      function shimTrackEventTransceiver(window) {
        // Add event.transceiver member over deprecated event.receiver
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCTrackEvent && 'receiver' in window.RTCTrackEvent.prototype && !('transceiver' in window.RTCTrackEvent.prototype)) {
          Object.defineProperty(window.RTCTrackEvent.prototype, 'transceiver', {
            get: function get() {
              return { receiver: this.receiver };
            }
          });
        }
      }
      
      function shimCreateOfferLegacy(window) {
        var origCreateOffer = window.RTCPeerConnection.prototype.createOffer;
        window.RTCPeerConnection.prototype.createOffer = function createOffer(offerOptions) {
          if (offerOptions) {
            if (typeof offerOptions.offerToReceiveAudio !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveAudio = !!offerOptions.offerToReceiveAudio;
            }
            var audioTransceiver = this.getTransceivers().find(function (transceiver) {
              return transceiver.receiver.track.kind === 'audio';
            });
            if (offerOptions.offerToReceiveAudio === false && audioTransceiver) {
              if (audioTransceiver.direction === 'sendrecv') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('sendonly');
                } else {
                  audioTransceiver.direction = 'sendonly';
                }
              } else if (audioTransceiver.direction === 'recvonly') {
                if (audioTransceiver.setDirection) {
                  audioTransceiver.setDirection('inactive');
                } else {
                  audioTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveAudio === true && !audioTransceiver) {
              this.addTransceiver('audio');
            }
      
            if (typeof offerOptions.offerToReceiveVideo !== 'undefined') {
              // support bit values
              offerOptions.offerToReceiveVideo = !!offerOptions.offerToReceiveVideo;
            }
            var videoTransceiver = this.getTransceivers().find(function (transceiver) {
              return transceiver.receiver.track.kind === 'video';
            });
            if (offerOptions.offerToReceiveVideo === false && videoTransceiver) {
              if (videoTransceiver.direction === 'sendrecv') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('sendonly');
                } else {
                  videoTransceiver.direction = 'sendonly';
                }
              } else if (videoTransceiver.direction === 'recvonly') {
                if (videoTransceiver.setDirection) {
                  videoTransceiver.setDirection('inactive');
                } else {
                  videoTransceiver.direction = 'inactive';
                }
              }
            } else if (offerOptions.offerToReceiveVideo === true && !videoTransceiver) {
              this.addTransceiver('video');
            }
          }
          return origCreateOffer.apply(this, arguments);
        };
      }
      
      function shimAudioContext(window) {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || window.AudioContext) {
          return;
        }
        window.AudioContext = window.webkitAudioContext;
      }
      
      },{"../utils":15}],15:[function(require,module,exports){
      /*
       *  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
      /* eslint-env node */
      'use strict';
      
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
      
      exports.extractVersion = extractVersion;
      exports.wrapPeerConnectionEvent = wrapPeerConnectionEvent;
      exports.disableLog = disableLog;
      exports.disableWarnings = disableWarnings;
      exports.log = log;
      exports.deprecated = deprecated;
      exports.detectBrowser = detectBrowser;
      exports.compactObject = compactObject;
      exports.walkStats = walkStats;
      exports.filterStats = filterStats;
      
      function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
      
      var logDisabled_ = true;
      var deprecationWarnings_ = true;
      
      /**
       * Extract browser version out of the provided user agent string.
       *
       * @param {!string} uastring userAgent string.
       * @param {!string} expr Regular expression used as match criteria.
       * @param {!number} pos position in the version string to be returned.
       * @return {!number} browser version.
       */
      function extractVersion(uastring, expr, pos) {
        var match = uastring.match(expr);
        return match && match.length >= pos && parseInt(match[pos], 10);
      }
      
      // Wraps the peerconnection event eventNameToWrap in a function
      // which returns the modified event object (or false to prevent
      // the event).
      function wrapPeerConnectionEvent(window, eventNameToWrap, wrapper) {
        if (!window.RTCPeerConnection) {
          return;
        }
        var proto = window.RTCPeerConnection.prototype;
        var nativeAddEventListener = proto.addEventListener;
        proto.addEventListener = function (nativeEventName, cb) {
          if (nativeEventName !== eventNameToWrap) {
            return nativeAddEventListener.apply(this, arguments);
          }
          var wrappedCallback = function wrappedCallback(e) {
            var modifiedEvent = wrapper(e);
            if (modifiedEvent) {
              if (cb.handleEvent) {
                cb.handleEvent(modifiedEvent);
              } else {
                cb(modifiedEvent);
              }
            }
          };
          this._eventMap = this._eventMap || {};
          if (!this._eventMap[eventNameToWrap]) {
            this._eventMap[eventNameToWrap] = new Map();
          }
          this._eventMap[eventNameToWrap].set(cb, wrappedCallback);
          return nativeAddEventListener.apply(this, [nativeEventName, wrappedCallback]);
        };
      
        var nativeRemoveEventListener = proto.removeEventListener;
        proto.removeEventListener = function (nativeEventName, cb) {
          if (nativeEventName !== eventNameToWrap || !this._eventMap || !this._eventMap[eventNameToWrap]) {
            return nativeRemoveEventListener.apply(this, arguments);
          }
          if (!this._eventMap[eventNameToWrap].has(cb)) {
            return nativeRemoveEventListener.apply(this, arguments);
          }
          var unwrappedCb = this._eventMap[eventNameToWrap].get(cb);
          this._eventMap[eventNameToWrap].delete(cb);
          if (this._eventMap[eventNameToWrap].size === 0) {
            delete this._eventMap[eventNameToWrap];
          }
          if (Object.keys(this._eventMap).length === 0) {
            delete this._eventMap;
          }
          return nativeRemoveEventListener.apply(this, [nativeEventName, unwrappedCb]);
        };
      
        Object.defineProperty(proto, 'on' + eventNameToWrap, {
          get: function get() {
            return this['_on' + eventNameToWrap];
          },
          set: function set(cb) {
            if (this['_on' + eventNameToWrap]) {
              this.removeEventListener(eventNameToWrap, this['_on' + eventNameToWrap]);
              delete this['_on' + eventNameToWrap];
            }
            if (cb) {
              this.addEventListener(eventNameToWrap, this['_on' + eventNameToWrap] = cb);
            }
          },
      
          enumerable: true,
          configurable: true
        });
      }
      
      function disableLog(bool) {
        if (typeof bool !== 'boolean') {
          return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
        }
        logDisabled_ = bool;
        return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
      }
      
      /**
       * Disable or enable deprecation warnings
       * @param {!boolean} bool set to true to disable warnings.
       */
      function disableWarnings(bool) {
        if (typeof bool !== 'boolean') {
          return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
        }
        deprecationWarnings_ = !bool;
        return 'adapter.js deprecation warnings ' + (bool ? 'disabled' : 'enabled');
      }
      
      function log() {
        if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
          if (logDisabled_) {
            return;
          }
          if (typeof console !== 'undefined' && typeof console.log === 'function') {
            console.log.apply(console, arguments);
          }
        }
      }
      
      /**
       * Shows a deprecation warning suggesting the modern and spec-compatible API.
       */
      function deprecated(oldMethod, newMethod) {
        if (!deprecationWarnings_) {
          return;
        }
        console.warn(oldMethod + ' is deprecated, please use ' + newMethod + ' instead.');
      }
      
      /**
       * Browser detector.
       *
       * @return {object} result containing browser and version
       *     properties.
       */
      function detectBrowser(window) {
        // Returned result object.
        var result = { browser: null, version: null };
      
        // Fail early if it's not a browser
        if (typeof window === 'undefined' || !window.navigator) {
          result.browser = 'Not a browser.';
          return result;
        }
      
        var navigator = window.navigator;
      
      
        if (navigator.mozGetUserMedia) {
          // Firefox.
          result.browser = 'firefox';
          result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
        } else if (navigator.webkitGetUserMedia || window.isSecureContext === false && window.webkitRTCPeerConnection && !window.RTCIceGatherer) {
          // Chrome, Chromium, Webview, Opera.
          // Version matches Chrome/WebRTC version.
          // Chrome 74 removed webkitGetUserMedia on http as well so we need the
          // more complicated fallback to webkitRTCPeerConnection.
          result.browser = 'chrome';
          result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
        } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
          // Edge.
          result.browser = 'edge';
          result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        } else if (window.RTCPeerConnection && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
          // Safari.
          result.browser = 'safari';
          result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
          result.supportsUnifiedPlan = window.RTCRtpTransceiver && 'currentDirection' in window.RTCRtpTransceiver.prototype;
        } else {
          // Default fallthrough: not supported.
          result.browser = 'Not a supported browser.';
          return result;
        }
      
        return result;
      }
      
      /**
       * Checks if something is an object.
       *
       * @param {*} val The something you want to check.
       * @return true if val is an object, false otherwise.
       */
      function isObject(val) {
        return Object.prototype.toString.call(val) === '[object Object]';
      }
      
      /**
       * Remove all empty objects and undefined values
       * from a nested object -- an enhanced and vanilla version
       * of Lodash's `compact`.
       */
      function compactObject(data) {
        if (!isObject(data)) {
          return data;
        }
      
        return Object.keys(data).reduce(function (accumulator, key) {
          var isObj = isObject(data[key]);
          var value = isObj ? compactObject(data[key]) : data[key];
          var isEmptyObject = isObj && !Object.keys(value).length;
          if (value === undefined || isEmptyObject) {
            return accumulator;
          }
          return Object.assign(accumulator, _defineProperty({}, key, value));
        }, {});
      }
      
      /* iterates the stats graph recursively. */
      function walkStats(stats, base, resultSet) {
        if (!base || resultSet.has(base.id)) {
          return;
        }
        resultSet.set(base.id, base);
        Object.keys(base).forEach(function (name) {
          if (name.endsWith('Id')) {
            walkStats(stats, stats.get(base[name]), resultSet);
          } else if (name.endsWith('Ids')) {
            base[name].forEach(function (id) {
              walkStats(stats, stats.get(id), resultSet);
            });
          }
        });
      }
      
      /* filter getStats for a sender/receiver track. */
      function filterStats(result, track, outbound) {
        var streamStatsType = outbound ? 'outbound-rtp' : 'inbound-rtp';
        var filteredResult = new Map();
        if (track === null) {
          return filteredResult;
        }
        var trackStats = [];
        result.forEach(function (value) {
          if (value.type === 'track' && value.trackIdentifier === track.id) {
            trackStats.push(value);
          }
        });
        trackStats.forEach(function (trackStat) {
          result.forEach(function (stats) {
            if (stats.type === streamStatsType && stats.trackId === trackStat.id) {
              walkStats(result, stats, filteredResult);
            }
          });
        });
        return filteredResult;
      }
      
      },{}],16:[function(require,module,exports){
      /*
       *  Copyright (c) 2017 The WebRTC project authors. All Rights Reserved.
       *
       *  Use of this source code is governed by a BSD-style license
       *  that can be found in the LICENSE file in the root of the source
       *  tree.
       */
       /* eslint-env node */
      'use strict';
      
      var SDPUtils = require('sdp');
      
      function fixStatsType(stat) {
        return {
          inboundrtp: 'inbound-rtp',
          outboundrtp: 'outbound-rtp',
          candidatepair: 'candidate-pair',
          localcandidate: 'local-candidate',
          remotecandidate: 'remote-candidate'
        }[stat.type] || stat.type;
      }
      
      function writeMediaSection(transceiver, caps, type, stream, dtlsRole) {
        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
      
        // Map ICE parameters (ufrag, pwd) to SDP.
        sdp += SDPUtils.writeIceParameters(
            transceiver.iceGatherer.getLocalParameters());
      
        // Map DTLS parameters to SDP.
        sdp += SDPUtils.writeDtlsParameters(
            transceiver.dtlsTransport.getLocalParameters(),
            type === 'offer' ? 'actpass' : dtlsRole || 'active');
      
        sdp += 'a=mid:' + transceiver.mid + '\r\n';
      
        if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += 'a=sendrecv\r\n';
        } else if (transceiver.rtpSender) {
          sdp += 'a=sendonly\r\n';
        } else if (transceiver.rtpReceiver) {
          sdp += 'a=recvonly\r\n';
        } else {
          sdp += 'a=inactive\r\n';
        }
      
        if (transceiver.rtpSender) {
          var trackId = transceiver.rtpSender._initialTrackId ||
              transceiver.rtpSender.track.id;
          transceiver.rtpSender._initialTrackId = trackId;
          // spec.
          var msid = 'msid:' + (stream ? stream.id : '-') + ' ' +
              trackId + '\r\n';
          sdp += 'a=' + msid;
          // for Chrome. Legacy should no longer be required.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
              ' ' + msid;
      
          // RTX
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                ' ' + msid;
            sdp += 'a=ssrc-group:FID ' +
                transceiver.sendEncodingParameters[0].ssrc + ' ' +
                transceiver.sendEncodingParameters[0].rtx.ssrc +
                '\r\n';
          }
        }
        // FIXME: this should be written by writeRtpDescription.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
            ' cname:' + SDPUtils.localCName + '\r\n';
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
              ' cname:' + SDPUtils.localCName + '\r\n';
        }
        return sdp;
      }
      
      // Edge does not like
      // 1) stun: filtered after 14393 unless ?transport=udp is present
      // 2) turn: that does not have all of turn:host:port?transport=udp
      // 3) turn: with ipv6 addresses
      // 4) turn: occurring muliple times
      function filterIceServers(iceServers, edgeVersion) {
        var hasTurn = false;
        iceServers = JSON.parse(JSON.stringify(iceServers));
        return iceServers.filter(function(server) {
          if (server && (server.urls || server.url)) {
            var urls = server.urls || server.url;
            if (server.url && !server.urls) {
              console.warn('RTCIceServer.url is deprecated! Use urls instead.');
            }
            var isString = typeof urls === 'string';
            if (isString) {
              urls = [urls];
            }
            urls = urls.filter(function(url) {
              var validTurn = url.indexOf('turn:') === 0 &&
                  url.indexOf('transport=udp') !== -1 &&
                  url.indexOf('turn:[') === -1 &&
                  !hasTurn;
      
              if (validTurn) {
                hasTurn = true;
                return true;
              }
              return url.indexOf('stun:') === 0 && edgeVersion >= 14393 &&
                  url.indexOf('?transport=udp') === -1;
            });
      
            delete server.url;
            server.urls = isString ? urls[0] : urls;
            return !!urls.length;
          }
        });
      }
      
      // Determines the intersection of local and remote capabilities.
      function getCommonCapabilities(localCapabilities, remoteCapabilities) {
        var commonCapabilities = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: []
        };
      
        var findCodecByPayloadType = function(pt, codecs) {
          pt = parseInt(pt, 10);
          for (var i = 0; i < codecs.length; i++) {
            if (codecs[i].payloadType === pt ||
                codecs[i].preferredPayloadType === pt) {
              return codecs[i];
            }
          }
        };
      
        var rtxCapabilityMatches = function(lRtx, rRtx, lCodecs, rCodecs) {
          var lCodec = findCodecByPayloadType(lRtx.parameters.apt, lCodecs);
          var rCodec = findCodecByPayloadType(rRtx.parameters.apt, rCodecs);
          return lCodec && rCodec &&
              lCodec.name.toLowerCase() === rCodec.name.toLowerCase();
        };
      
        localCapabilities.codecs.forEach(function(lCodec) {
          for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
            var rCodec = remoteCapabilities.codecs[i];
            if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() &&
                lCodec.clockRate === rCodec.clockRate) {
              if (lCodec.name.toLowerCase() === 'rtx' &&
                  lCodec.parameters && rCodec.parameters.apt) {
                // for RTX we need to find the local rtx that has a apt
                // which points to the same local codec as the remote one.
                if (!rtxCapabilityMatches(lCodec, rCodec,
                    localCapabilities.codecs, remoteCapabilities.codecs)) {
                  continue;
                }
              }
              rCodec = JSON.parse(JSON.stringify(rCodec)); // deepcopy
              // number of channels is the highest common number of channels
              rCodec.numChannels = Math.min(lCodec.numChannels,
                  rCodec.numChannels);
              // push rCodec so we reply with offerer payload type
              commonCapabilities.codecs.push(rCodec);
      
              // determine common feedback mechanisms
              rCodec.rtcpFeedback = rCodec.rtcpFeedback.filter(function(fb) {
                for (var j = 0; j < lCodec.rtcpFeedback.length; j++) {
                  if (lCodec.rtcpFeedback[j].type === fb.type &&
                      lCodec.rtcpFeedback[j].parameter === fb.parameter) {
                    return true;
                  }
                }
                return false;
              });
              // FIXME: also need to determine .parameters
              //  see https://github.com/openpeer/ortc/issues/569
              break;
            }
          }
        });
      
        localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
          for (var i = 0; i < remoteCapabilities.headerExtensions.length;
               i++) {
            var rHeaderExtension = remoteCapabilities.headerExtensions[i];
            if (lHeaderExtension.uri === rHeaderExtension.uri) {
              commonCapabilities.headerExtensions.push(rHeaderExtension);
              break;
            }
          }
        });
      
        // FIXME: fecMechanisms
        return commonCapabilities;
      }
      
      // is action=setLocalDescription with type allowed in signalingState
      function isActionAllowedInSignalingState(action, type, signalingState) {
        return {
          offer: {
            setLocalDescription: ['stable', 'have-local-offer'],
            setRemoteDescription: ['stable', 'have-remote-offer']
          },
          answer: {
            setLocalDescription: ['have-remote-offer', 'have-local-pranswer'],
            setRemoteDescription: ['have-local-offer', 'have-remote-pranswer']
          }
        }[type][action].indexOf(signalingState) !== -1;
      }
      
      function maybeAddCandidate(iceTransport, candidate) {
        // Edge's internal representation adds some fields therefore
        // not all fieldѕ are taken into account.
        var alreadyAdded = iceTransport.getRemoteCandidates()
            .find(function(remoteCandidate) {
              return candidate.foundation === remoteCandidate.foundation &&
                  candidate.ip === remoteCandidate.ip &&
                  candidate.port === remoteCandidate.port &&
                  candidate.priority === remoteCandidate.priority &&
                  candidate.protocol === remoteCandidate.protocol &&
                  candidate.type === remoteCandidate.type;
            });
        if (!alreadyAdded) {
          iceTransport.addRemoteCandidate(candidate);
        }
        return !alreadyAdded;
      }
      
      
      function makeError(name, description) {
        var e = new Error(description);
        e.name = name;
        // legacy error codes from https://heycam.github.io/webidl/#idl-DOMException-error-names
        e.code = {
          NotSupportedError: 9,
          InvalidStateError: 11,
          InvalidAccessError: 15,
          TypeError: undefined,
          OperationError: undefined
        }[name];
        return e;
      }
      
      module.exports = function(window, edgeVersion) {
        // https://w3c.github.io/mediacapture-main/#mediastream
        // Helper function to add the track to the stream and
        // dispatch the event ourselves.
        function addTrackToStreamAndFireEvent(track, stream) {
          stream.addTrack(track);
          stream.dispatchEvent(new window.MediaStreamTrackEvent('addtrack',
              {track: track}));
        }
      
        function removeTrackFromStreamAndFireEvent(track, stream) {
          stream.removeTrack(track);
          stream.dispatchEvent(new window.MediaStreamTrackEvent('removetrack',
              {track: track}));
        }
      
        function fireAddTrack(pc, track, receiver, streams) {
          var trackEvent = new Event('track');
          trackEvent.track = track;
          trackEvent.receiver = receiver;
          trackEvent.transceiver = {receiver: receiver};
          trackEvent.streams = streams;
          window.setTimeout(function() {
            pc._dispatchEvent('track', trackEvent);
          });
        }
      
        var RTCPeerConnection = function(config) {
          var pc = this;
      
          var _eventTarget = document.createDocumentFragment();
          ['addEventListener', 'removeEventListener', 'dispatchEvent']
              .forEach(function(method) {
                pc[method] = _eventTarget[method].bind(_eventTarget);
              });
      
          this.canTrickleIceCandidates = null;
      
          this.needNegotiation = false;
      
          this.localStreams = [];
          this.remoteStreams = [];
      
          this._localDescription = null;
          this._remoteDescription = null;
      
          this.signalingState = 'stable';
          this.iceConnectionState = 'new';
          this.connectionState = 'new';
          this.iceGatheringState = 'new';
      
          config = JSON.parse(JSON.stringify(config || {}));
      
          this.usingBundle = config.bundlePolicy === 'max-bundle';
          if (config.rtcpMuxPolicy === 'negotiate') {
            throw(makeError('NotSupportedError',
                'rtcpMuxPolicy \'negotiate\' is not supported'));
          } else if (!config.rtcpMuxPolicy) {
            config.rtcpMuxPolicy = 'require';
          }
      
          switch (config.iceTransportPolicy) {
            case 'all':
            case 'relay':
              break;
            default:
              config.iceTransportPolicy = 'all';
              break;
          }
      
          switch (config.bundlePolicy) {
            case 'balanced':
            case 'max-compat':
            case 'max-bundle':
              break;
            default:
              config.bundlePolicy = 'balanced';
              break;
          }
      
          config.iceServers = filterIceServers(config.iceServers || [], edgeVersion);
      
          this._iceGatherers = [];
          if (config.iceCandidatePoolSize) {
            for (var i = config.iceCandidatePoolSize; i > 0; i--) {
              this._iceGatherers.push(new window.RTCIceGatherer({
                iceServers: config.iceServers,
                gatherPolicy: config.iceTransportPolicy
              }));
            }
          } else {
            config.iceCandidatePoolSize = 0;
          }
      
          this._config = config;
      
          // per-track iceGathers, iceTransports, dtlsTransports, rtpSenders, ...
          // everything that is needed to describe a SDP m-line.
          this.transceivers = [];
      
          this._sdpSessionId = SDPUtils.generateSessionId();
          this._sdpSessionVersion = 0;
      
          this._dtlsRole = undefined; // role for a=setup to use in answers.
      
          this._isClosed = false;
        };
      
        Object.defineProperty(RTCPeerConnection.prototype, 'localDescription', {
          configurable: true,
          get: function() {
            return this._localDescription;
          }
        });
        Object.defineProperty(RTCPeerConnection.prototype, 'remoteDescription', {
          configurable: true,
          get: function() {
            return this._remoteDescription;
          }
        });
      
        // set up event handlers on prototype
        RTCPeerConnection.prototype.onicecandidate = null;
        RTCPeerConnection.prototype.onaddstream = null;
        RTCPeerConnection.prototype.ontrack = null;
        RTCPeerConnection.prototype.onremovestream = null;
        RTCPeerConnection.prototype.onsignalingstatechange = null;
        RTCPeerConnection.prototype.oniceconnectionstatechange = null;
        RTCPeerConnection.prototype.onconnectionstatechange = null;
        RTCPeerConnection.prototype.onicegatheringstatechange = null;
        RTCPeerConnection.prototype.onnegotiationneeded = null;
        RTCPeerConnection.prototype.ondatachannel = null;
      
        RTCPeerConnection.prototype._dispatchEvent = function(name, event) {
          if (this._isClosed) {
            return;
          }
          this.dispatchEvent(event);
          if (typeof this['on' + name] === 'function') {
            this['on' + name](event);
          }
        };
      
        RTCPeerConnection.prototype._emitGatheringStateChange = function() {
          var event = new Event('icegatheringstatechange');
          this._dispatchEvent('icegatheringstatechange', event);
        };
      
        RTCPeerConnection.prototype.getConfiguration = function() {
          return this._config;
        };
      
        RTCPeerConnection.prototype.getLocalStreams = function() {
          return this.localStreams;
        };
      
        RTCPeerConnection.prototype.getRemoteStreams = function() {
          return this.remoteStreams;
        };
      
        // internal helper to create a transceiver object.
        // (which is not yet the same as the WebRTC 1.0 transceiver)
        RTCPeerConnection.prototype._createTransceiver = function(kind, doNotAdd) {
          var hasBundleTransport = this.transceivers.length > 0;
          var transceiver = {
            track: null,
            iceGatherer: null,
            iceTransport: null,
            dtlsTransport: null,
            localCapabilities: null,
            remoteCapabilities: null,
            rtpSender: null,
            rtpReceiver: null,
            kind: kind,
            mid: null,
            sendEncodingParameters: null,
            recvEncodingParameters: null,
            stream: null,
            associatedRemoteMediaStreams: [],
            wantReceive: true
          };
          if (this.usingBundle && hasBundleTransport) {
            transceiver.iceTransport = this.transceivers[0].iceTransport;
            transceiver.dtlsTransport = this.transceivers[0].dtlsTransport;
          } else {
            var transports = this._createIceAndDtlsTransports();
            transceiver.iceTransport = transports.iceTransport;
            transceiver.dtlsTransport = transports.dtlsTransport;
          }
          if (!doNotAdd) {
            this.transceivers.push(transceiver);
          }
          return transceiver;
        };
      
        RTCPeerConnection.prototype.addTrack = function(track, stream) {
          if (this._isClosed) {
            throw makeError('InvalidStateError',
                'Attempted to call addTrack on a closed peerconnection.');
          }
      
          var alreadyExists = this.transceivers.find(function(s) {
            return s.track === track;
          });
      
          if (alreadyExists) {
            throw makeError('InvalidAccessError', 'Track already exists.');
          }
      
          var transceiver;
          for (var i = 0; i < this.transceivers.length; i++) {
            if (!this.transceivers[i].track &&
                this.transceivers[i].kind === track.kind) {
              transceiver = this.transceivers[i];
            }
          }
          if (!transceiver) {
            transceiver = this._createTransceiver(track.kind);
          }
      
          this._maybeFireNegotiationNeeded();
      
          if (this.localStreams.indexOf(stream) === -1) {
            this.localStreams.push(stream);
          }
      
          transceiver.track = track;
          transceiver.stream = stream;
          transceiver.rtpSender = new window.RTCRtpSender(track,
              transceiver.dtlsTransport);
          return transceiver.rtpSender;
        };
      
        RTCPeerConnection.prototype.addStream = function(stream) {
          var pc = this;
          if (edgeVersion >= 15025) {
            stream.getTracks().forEach(function(track) {
              pc.addTrack(track, stream);
            });
          } else {
            // Clone is necessary for local demos mostly, attaching directly
            // to two different senders does not work (build 10547).
            // Fixed in 15025 (or earlier)
            var clonedStream = stream.clone();
            stream.getTracks().forEach(function(track, idx) {
              var clonedTrack = clonedStream.getTracks()[idx];
              track.addEventListener('enabled', function(event) {
                clonedTrack.enabled = event.enabled;
              });
            });
            clonedStream.getTracks().forEach(function(track) {
              pc.addTrack(track, clonedStream);
            });
          }
        };
      
        RTCPeerConnection.prototype.removeTrack = function(sender) {
          if (this._isClosed) {
            throw makeError('InvalidStateError',
                'Attempted to call removeTrack on a closed peerconnection.');
          }
      
          if (!(sender instanceof window.RTCRtpSender)) {
            throw new TypeError('Argument 1 of RTCPeerConnection.removeTrack ' +
                'does not implement interface RTCRtpSender.');
          }
      
          var transceiver = this.transceivers.find(function(t) {
            return t.rtpSender === sender;
          });
      
          if (!transceiver) {
            throw makeError('InvalidAccessError',
                'Sender was not created by this connection.');
          }
          var stream = transceiver.stream;
      
          transceiver.rtpSender.stop();
          transceiver.rtpSender = null;
          transceiver.track = null;
          transceiver.stream = null;
      
          // remove the stream from the set of local streams
          var localStreams = this.transceivers.map(function(t) {
            return t.stream;
          });
          if (localStreams.indexOf(stream) === -1 &&
              this.localStreams.indexOf(stream) > -1) {
            this.localStreams.splice(this.localStreams.indexOf(stream), 1);
          }
      
          this._maybeFireNegotiationNeeded();
        };
      
        RTCPeerConnection.prototype.removeStream = function(stream) {
          var pc = this;
          stream.getTracks().forEach(function(track) {
            var sender = pc.getSenders().find(function(s) {
              return s.track === track;
            });
            if (sender) {
              pc.removeTrack(sender);
            }
          });
        };
      
        RTCPeerConnection.prototype.getSenders = function() {
          return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpSender;
          })
          .map(function(transceiver) {
            return transceiver.rtpSender;
          });
        };
      
        RTCPeerConnection.prototype.getReceivers = function() {
          return this.transceivers.filter(function(transceiver) {
            return !!transceiver.rtpReceiver;
          })
          .map(function(transceiver) {
            return transceiver.rtpReceiver;
          });
        };
      
      
        RTCPeerConnection.prototype._createIceGatherer = function(sdpMLineIndex,
            usingBundle) {
          var pc = this;
          if (usingBundle && sdpMLineIndex > 0) {
            return this.transceivers[0].iceGatherer;
          } else if (this._iceGatherers.length) {
            return this._iceGatherers.shift();
          }
          var iceGatherer = new window.RTCIceGatherer({
            iceServers: this._config.iceServers,
            gatherPolicy: this._config.iceTransportPolicy
          });
          Object.defineProperty(iceGatherer, 'state',
              {value: 'new', writable: true}
          );
      
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = [];
          this.transceivers[sdpMLineIndex].bufferCandidates = function(event) {
            var end = !event.candidate || Object.keys(event.candidate).length === 0;
            // polyfill since RTCIceGatherer.state is not implemented in
            // Edge 10547 yet.
            iceGatherer.state = end ? 'completed' : 'gathering';
            if (pc.transceivers[sdpMLineIndex].bufferedCandidateEvents !== null) {
              pc.transceivers[sdpMLineIndex].bufferedCandidateEvents.push(event);
            }
          };
          iceGatherer.addEventListener('localcandidate',
            this.transceivers[sdpMLineIndex].bufferCandidates);
          return iceGatherer;
        };
      
        // start gathering from an RTCIceGatherer.
        RTCPeerConnection.prototype._gather = function(mid, sdpMLineIndex) {
          var pc = this;
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer.onlocalcandidate) {
            return;
          }
          var bufferedCandidateEvents =
            this.transceivers[sdpMLineIndex].bufferedCandidateEvents;
          this.transceivers[sdpMLineIndex].bufferedCandidateEvents = null;
          iceGatherer.removeEventListener('localcandidate',
            this.transceivers[sdpMLineIndex].bufferCandidates);
          iceGatherer.onlocalcandidate = function(evt) {
            if (pc.usingBundle && sdpMLineIndex > 0) {
              // if we know that we use bundle we can drop candidates with
              // ѕdpMLineIndex > 0. If we don't do this then our state gets
              // confused since we dispose the extra ice gatherer.
              return;
            }
            var event = new Event('icecandidate');
            event.candidate = {sdpMid: mid, sdpMLineIndex: sdpMLineIndex};
      
            var cand = evt.candidate;
            // Edge emits an empty object for RTCIceCandidateComplete‥
            var end = !cand || Object.keys(cand).length === 0;
            if (end) {
              // polyfill since RTCIceGatherer.state is not implemented in
              // Edge 10547 yet.
              if (iceGatherer.state === 'new' || iceGatherer.state === 'gathering') {
                iceGatherer.state = 'completed';
              }
            } else {
              if (iceGatherer.state === 'new') {
                iceGatherer.state = 'gathering';
              }
              // RTCIceCandidate doesn't have a component, needs to be added
              cand.component = 1;
              // also the usernameFragment. TODO: update SDP to take both variants.
              cand.ufrag = iceGatherer.getLocalParameters().usernameFragment;
      
              var serializedCandidate = SDPUtils.writeCandidate(cand);
              event.candidate = Object.assign(event.candidate,
                  SDPUtils.parseCandidate(serializedCandidate));
      
              event.candidate.candidate = serializedCandidate;
              event.candidate.toJSON = function() {
                return {
                  candidate: event.candidate.candidate,
                  sdpMid: event.candidate.sdpMid,
                  sdpMLineIndex: event.candidate.sdpMLineIndex,
                  usernameFragment: event.candidate.usernameFragment
                };
              };
            }
      
            // update local description.
            var sections = SDPUtils.getMediaSections(pc._localDescription.sdp);
            if (!end) {
              sections[event.candidate.sdpMLineIndex] +=
                  'a=' + event.candidate.candidate + '\r\n';
            } else {
              sections[event.candidate.sdpMLineIndex] +=
                  'a=end-of-candidates\r\n';
            }
            pc._localDescription.sdp =
                SDPUtils.getDescription(pc._localDescription.sdp) +
                sections.join('');
            var complete = pc.transceivers.every(function(transceiver) {
              return transceiver.iceGatherer &&
                  transceiver.iceGatherer.state === 'completed';
            });
      
            if (pc.iceGatheringState !== 'gathering') {
              pc.iceGatheringState = 'gathering';
              pc._emitGatheringStateChange();
            }
      
            // Emit candidate. Also emit null candidate when all gatherers are
            // complete.
            if (!end) {
              pc._dispatchEvent('icecandidate', event);
            }
            if (complete) {
              pc._dispatchEvent('icecandidate', new Event('icecandidate'));
              pc.iceGatheringState = 'complete';
              pc._emitGatheringStateChange();
            }
          };
      
          // emit already gathered candidates.
          window.setTimeout(function() {
            bufferedCandidateEvents.forEach(function(e) {
              iceGatherer.onlocalcandidate(e);
            });
          }, 0);
        };
      
        // Create ICE transport and DTLS transport.
        RTCPeerConnection.prototype._createIceAndDtlsTransports = function() {
          var pc = this;
          var iceTransport = new window.RTCIceTransport(null);
          iceTransport.onicestatechange = function() {
            pc._updateIceConnectionState();
            pc._updateConnectionState();
          };
      
          var dtlsTransport = new window.RTCDtlsTransport(iceTransport);
          dtlsTransport.ondtlsstatechange = function() {
            pc._updateConnectionState();
          };
          dtlsTransport.onerror = function() {
            // onerror does not set state to failed by itself.
            Object.defineProperty(dtlsTransport, 'state',
                {value: 'failed', writable: true});
            pc._updateConnectionState();
          };
      
          return {
            iceTransport: iceTransport,
            dtlsTransport: dtlsTransport
          };
        };
      
        // Destroy ICE gatherer, ICE transport and DTLS transport.
        // Without triggering the callbacks.
        RTCPeerConnection.prototype._disposeIceAndDtlsTransports = function(
            sdpMLineIndex) {
          var iceGatherer = this.transceivers[sdpMLineIndex].iceGatherer;
          if (iceGatherer) {
            delete iceGatherer.onlocalcandidate;
            delete this.transceivers[sdpMLineIndex].iceGatherer;
          }
          var iceTransport = this.transceivers[sdpMLineIndex].iceTransport;
          if (iceTransport) {
            delete iceTransport.onicestatechange;
            delete this.transceivers[sdpMLineIndex].iceTransport;
          }
          var dtlsTransport = this.transceivers[sdpMLineIndex].dtlsTransport;
          if (dtlsTransport) {
            delete dtlsTransport.ondtlsstatechange;
            delete dtlsTransport.onerror;
            delete this.transceivers[sdpMLineIndex].dtlsTransport;
          }
        };
      
        // Start the RTP Sender and Receiver for a transceiver.
        RTCPeerConnection.prototype._transceive = function(transceiver,
            send, recv) {
          var params = getCommonCapabilities(transceiver.localCapabilities,
              transceiver.remoteCapabilities);
          if (send && transceiver.rtpSender) {
            params.encodings = transceiver.sendEncodingParameters;
            params.rtcp = {
              cname: SDPUtils.localCName,
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.recvEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
            }
            transceiver.rtpSender.send(params);
          }
          if (recv && transceiver.rtpReceiver && params.codecs.length > 0) {
            // remove RTX field in Edge 14942
            if (transceiver.kind === 'video'
                && transceiver.recvEncodingParameters
                && edgeVersion < 15019) {
              transceiver.recvEncodingParameters.forEach(function(p) {
                delete p.rtx;
              });
            }
            if (transceiver.recvEncodingParameters.length) {
              params.encodings = transceiver.recvEncodingParameters;
            } else {
              params.encodings = [{}];
            }
            params.rtcp = {
              compound: transceiver.rtcpParameters.compound
            };
            if (transceiver.rtcpParameters.cname) {
              params.rtcp.cname = transceiver.rtcpParameters.cname;
            }
            if (transceiver.sendEncodingParameters.length) {
              params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
            }
            transceiver.rtpReceiver.receive(params);
          }
        };
      
        RTCPeerConnection.prototype.setLocalDescription = function(description) {
          var pc = this;
      
          // Note: pranswer is not supported.
          if (['offer', 'answer'].indexOf(description.type) === -1) {
            return Promise.reject(makeError('TypeError',
                'Unsupported type "' + description.type + '"'));
          }
      
          if (!isActionAllowedInSignalingState('setLocalDescription',
              description.type, pc.signalingState) || pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError',
                'Can not set local ' + description.type +
                ' in state ' + pc.signalingState));
          }
      
          var sections;
          var sessionpart;
          if (description.type === 'offer') {
            // VERY limited support for SDP munging. Limited to:
            // * changing the order of codecs
            sections = SDPUtils.splitSections(description.sdp);
            sessionpart = sections.shift();
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var caps = SDPUtils.parseRtpParameters(mediaSection);
              pc.transceivers[sdpMLineIndex].localCapabilities = caps;
            });
      
            pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
              pc._gather(transceiver.mid, sdpMLineIndex);
            });
          } else if (description.type === 'answer') {
            sections = SDPUtils.splitSections(pc._remoteDescription.sdp);
            sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart,
                'a=ice-lite').length > 0;
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var transceiver = pc.transceivers[sdpMLineIndex];
              var iceGatherer = transceiver.iceGatherer;
              var iceTransport = transceiver.iceTransport;
              var dtlsTransport = transceiver.dtlsTransport;
              var localCapabilities = transceiver.localCapabilities;
              var remoteCapabilities = transceiver.remoteCapabilities;
      
              // treat bundle-only as not-rejected.
              var rejected = SDPUtils.isRejected(mediaSection) &&
                  SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
      
              if (!rejected && !transceiver.rejected) {
                var remoteIceParameters = SDPUtils.getIceParameters(
                    mediaSection, sessionpart);
                var remoteDtlsParameters = SDPUtils.getDtlsParameters(
                    mediaSection, sessionpart);
                if (isIceLite) {
                  remoteDtlsParameters.role = 'server';
                }
      
                if (!pc.usingBundle || sdpMLineIndex === 0) {
                  pc._gather(transceiver.mid, sdpMLineIndex);
                  if (iceTransport.state === 'new') {
                    iceTransport.start(iceGatherer, remoteIceParameters,
                        isIceLite ? 'controlling' : 'controlled');
                  }
                  if (dtlsTransport.state === 'new') {
                    dtlsTransport.start(remoteDtlsParameters);
                  }
                }
      
                // Calculate intersection of capabilities.
                var params = getCommonCapabilities(localCapabilities,
                    remoteCapabilities);
      
                // Start the RTCRtpSender. The RTCRtpReceiver for this
                // transceiver has already been started in setRemoteDescription.
                pc._transceive(transceiver,
                    params.codecs.length > 0,
                    false);
              }
            });
          }
      
          pc._localDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === 'offer') {
            pc._updateSignalingState('have-local-offer');
          } else {
            pc._updateSignalingState('stable');
          }
      
          return Promise.resolve();
        };
      
        RTCPeerConnection.prototype.setRemoteDescription = function(description) {
          var pc = this;
      
          // Note: pranswer is not supported.
          if (['offer', 'answer'].indexOf(description.type) === -1) {
            return Promise.reject(makeError('TypeError',
                'Unsupported type "' + description.type + '"'));
          }
      
          if (!isActionAllowedInSignalingState('setRemoteDescription',
              description.type, pc.signalingState) || pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError',
                'Can not set remote ' + description.type +
                ' in state ' + pc.signalingState));
          }
      
          var streams = {};
          pc.remoteStreams.forEach(function(stream) {
            streams[stream.id] = stream;
          });
          var receiverList = [];
          var sections = SDPUtils.splitSections(description.sdp);
          var sessionpart = sections.shift();
          var isIceLite = SDPUtils.matchPrefix(sessionpart,
              'a=ice-lite').length > 0;
          var usingBundle = SDPUtils.matchPrefix(sessionpart,
              'a=group:BUNDLE ').length > 0;
          pc.usingBundle = usingBundle;
          var iceOptions = SDPUtils.matchPrefix(sessionpart,
              'a=ice-options:')[0];
          if (iceOptions) {
            pc.canTrickleIceCandidates = iceOptions.substr(14).split(' ')
                .indexOf('trickle') >= 0;
          } else {
            pc.canTrickleIceCandidates = false;
          }
      
          sections.forEach(function(mediaSection, sdpMLineIndex) {
            var lines = SDPUtils.splitLines(mediaSection);
            var kind = SDPUtils.getKind(mediaSection);
            // treat bundle-only as not-rejected.
            var rejected = SDPUtils.isRejected(mediaSection) &&
                SDPUtils.matchPrefix(mediaSection, 'a=bundle-only').length === 0;
            var protocol = lines[0].substr(2).split(' ')[2];
      
            var direction = SDPUtils.getDirection(mediaSection, sessionpart);
            var remoteMsid = SDPUtils.parseMsid(mediaSection);
      
            var mid = SDPUtils.getMid(mediaSection) || SDPUtils.generateIdentifier();
      
            // Reject datachannels which are not implemented yet.
            if (rejected || (kind === 'application' && (protocol === 'DTLS/SCTP' ||
                protocol === 'UDP/DTLS/SCTP'))) {
              // TODO: this is dangerous in the case where a non-rejected m-line
              //     becomes rejected.
              pc.transceivers[sdpMLineIndex] = {
                mid: mid,
                kind: kind,
                protocol: protocol,
                rejected: true
              };
              return;
            }
      
            if (!rejected && pc.transceivers[sdpMLineIndex] &&
                pc.transceivers[sdpMLineIndex].rejected) {
              // recycle a rejected transceiver.
              pc.transceivers[sdpMLineIndex] = pc._createTransceiver(kind, true);
            }
      
            var transceiver;
            var iceGatherer;
            var iceTransport;
            var dtlsTransport;
            var rtpReceiver;
            var sendEncodingParameters;
            var recvEncodingParameters;
            var localCapabilities;
      
            var track;
            // FIXME: ensure the mediaSection has rtcp-mux set.
            var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
            var remoteIceParameters;
            var remoteDtlsParameters;
            if (!rejected) {
              remoteIceParameters = SDPUtils.getIceParameters(mediaSection,
                  sessionpart);
              remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection,
                  sessionpart);
              remoteDtlsParameters.role = 'client';
            }
            recvEncodingParameters =
                SDPUtils.parseRtpEncodingParameters(mediaSection);
      
            var rtcpParameters = SDPUtils.parseRtcpParameters(mediaSection);
      
            var isComplete = SDPUtils.matchPrefix(mediaSection,
                'a=end-of-candidates', sessionpart).length > 0;
            var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:')
                .map(function(cand) {
                  return SDPUtils.parseCandidate(cand);
                })
                .filter(function(cand) {
                  return cand.component === 1;
                });
      
            // Check if we can use BUNDLE and dispose transports.
            if ((description.type === 'offer' || description.type === 'answer') &&
                !rejected && usingBundle && sdpMLineIndex > 0 &&
                pc.transceivers[sdpMLineIndex]) {
              pc._disposeIceAndDtlsTransports(sdpMLineIndex);
              pc.transceivers[sdpMLineIndex].iceGatherer =
                  pc.transceivers[0].iceGatherer;
              pc.transceivers[sdpMLineIndex].iceTransport =
                  pc.transceivers[0].iceTransport;
              pc.transceivers[sdpMLineIndex].dtlsTransport =
                  pc.transceivers[0].dtlsTransport;
              if (pc.transceivers[sdpMLineIndex].rtpSender) {
                pc.transceivers[sdpMLineIndex].rtpSender.setTransport(
                    pc.transceivers[0].dtlsTransport);
              }
              if (pc.transceivers[sdpMLineIndex].rtpReceiver) {
                pc.transceivers[sdpMLineIndex].rtpReceiver.setTransport(
                    pc.transceivers[0].dtlsTransport);
              }
            }
            if (description.type === 'offer' && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex] ||
                  pc._createTransceiver(kind);
              transceiver.mid = mid;
      
              if (!transceiver.iceGatherer) {
                transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                    usingBundle);
              }
      
              if (cands.length && transceiver.iceTransport.state === 'new') {
                if (isComplete && (!usingBundle || sdpMLineIndex === 0)) {
                  transceiver.iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function(candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }
      
              localCapabilities = window.RTCRtpReceiver.getCapabilities(kind);
      
              // filter RTX until additional stuff needed for RTX is implemented
              // in adapter.js
              if (edgeVersion < 15019) {
                localCapabilities.codecs = localCapabilities.codecs.filter(
                    function(codec) {
                      return codec.name !== 'rtx';
                    });
              }
      
              sendEncodingParameters = transceiver.sendEncodingParameters || [{
                ssrc: (2 * sdpMLineIndex + 2) * 1001
              }];
      
              // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
              var isNewTrack = false;
              if (direction === 'sendrecv' || direction === 'sendonly') {
                isNewTrack = !transceiver.rtpReceiver;
                rtpReceiver = transceiver.rtpReceiver ||
                    new window.RTCRtpReceiver(transceiver.dtlsTransport, kind);
      
                if (isNewTrack) {
                  var stream;
                  track = rtpReceiver.track;
                  // FIXME: does not work with Plan B.
                  if (remoteMsid && remoteMsid.stream === '-') {
                    // no-op. a stream id of '-' means: no associated stream.
                  } else if (remoteMsid) {
                    if (!streams[remoteMsid.stream]) {
                      streams[remoteMsid.stream] = new window.MediaStream();
                      Object.defineProperty(streams[remoteMsid.stream], 'id', {
                        get: function() {
                          return remoteMsid.stream;
                        }
                      });
                    }
                    Object.defineProperty(track, 'id', {
                      get: function() {
                        return remoteMsid.track;
                      }
                    });
                    stream = streams[remoteMsid.stream];
                  } else {
                    if (!streams.default) {
                      streams.default = new window.MediaStream();
                    }
                    stream = streams.default;
                  }
                  if (stream) {
                    addTrackToStreamAndFireEvent(track, stream);
                    transceiver.associatedRemoteMediaStreams.push(stream);
                  }
                  receiverList.push([track, rtpReceiver, stream]);
                }
              } else if (transceiver.rtpReceiver && transceiver.rtpReceiver.track) {
                transceiver.associatedRemoteMediaStreams.forEach(function(s) {
                  var nativeTrack = s.getTracks().find(function(t) {
                    return t.id === transceiver.rtpReceiver.track.id;
                  });
                  if (nativeTrack) {
                    removeTrackFromStreamAndFireEvent(nativeTrack, s);
                  }
                });
                transceiver.associatedRemoteMediaStreams = [];
              }
      
              transceiver.localCapabilities = localCapabilities;
              transceiver.remoteCapabilities = remoteCapabilities;
              transceiver.rtpReceiver = rtpReceiver;
              transceiver.rtcpParameters = rtcpParameters;
              transceiver.sendEncodingParameters = sendEncodingParameters;
              transceiver.recvEncodingParameters = recvEncodingParameters;
      
              // Start the RTCRtpReceiver now. The RTPSender is started in
              // setLocalDescription.
              pc._transceive(pc.transceivers[sdpMLineIndex],
                  false,
                  isNewTrack);
            } else if (description.type === 'answer' && !rejected) {
              transceiver = pc.transceivers[sdpMLineIndex];
              iceGatherer = transceiver.iceGatherer;
              iceTransport = transceiver.iceTransport;
              dtlsTransport = transceiver.dtlsTransport;
              rtpReceiver = transceiver.rtpReceiver;
              sendEncodingParameters = transceiver.sendEncodingParameters;
              localCapabilities = transceiver.localCapabilities;
      
              pc.transceivers[sdpMLineIndex].recvEncodingParameters =
                  recvEncodingParameters;
              pc.transceivers[sdpMLineIndex].remoteCapabilities =
                  remoteCapabilities;
              pc.transceivers[sdpMLineIndex].rtcpParameters = rtcpParameters;
      
              if (cands.length && iceTransport.state === 'new') {
                if ((isIceLite || isComplete) &&
                    (!usingBundle || sdpMLineIndex === 0)) {
                  iceTransport.setRemoteCandidates(cands);
                } else {
                  cands.forEach(function(candidate) {
                    maybeAddCandidate(transceiver.iceTransport, candidate);
                  });
                }
              }
      
              if (!usingBundle || sdpMLineIndex === 0) {
                if (iceTransport.state === 'new') {
                  iceTransport.start(iceGatherer, remoteIceParameters,
                      'controlling');
                }
                if (dtlsTransport.state === 'new') {
                  dtlsTransport.start(remoteDtlsParameters);
                }
              }
      
              // If the offer contained RTX but the answer did not,
              // remove RTX from sendEncodingParameters.
              var commonCapabilities = getCommonCapabilities(
                transceiver.localCapabilities,
                transceiver.remoteCapabilities);
      
              var hasRtx = commonCapabilities.codecs.filter(function(c) {
                return c.name.toLowerCase() === 'rtx';
              }).length;
              if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
                delete transceiver.sendEncodingParameters[0].rtx;
              }
      
              pc._transceive(transceiver,
                  direction === 'sendrecv' || direction === 'recvonly',
                  direction === 'sendrecv' || direction === 'sendonly');
      
              // TODO: rewrite to use http://w3c.github.io/webrtc-pc/#set-associated-remote-streams
              if (rtpReceiver &&
                  (direction === 'sendrecv' || direction === 'sendonly')) {
                track = rtpReceiver.track;
                if (remoteMsid) {
                  if (!streams[remoteMsid.stream]) {
                    streams[remoteMsid.stream] = new window.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams[remoteMsid.stream]);
                  receiverList.push([track, rtpReceiver, streams[remoteMsid.stream]]);
                } else {
                  if (!streams.default) {
                    streams.default = new window.MediaStream();
                  }
                  addTrackToStreamAndFireEvent(track, streams.default);
                  receiverList.push([track, rtpReceiver, streams.default]);
                }
              } else {
                // FIXME: actually the receiver should be created later.
                delete transceiver.rtpReceiver;
              }
            }
          });
      
          if (pc._dtlsRole === undefined) {
            pc._dtlsRole = description.type === 'offer' ? 'active' : 'passive';
          }
      
          pc._remoteDescription = {
            type: description.type,
            sdp: description.sdp
          };
          if (description.type === 'offer') {
            pc._updateSignalingState('have-remote-offer');
          } else {
            pc._updateSignalingState('stable');
          }
          Object.keys(streams).forEach(function(sid) {
            var stream = streams[sid];
            if (stream.getTracks().length) {
              if (pc.remoteStreams.indexOf(stream) === -1) {
                pc.remoteStreams.push(stream);
                var event = new Event('addstream');
                event.stream = stream;
                window.setTimeout(function() {
                  pc._dispatchEvent('addstream', event);
                });
              }
      
              receiverList.forEach(function(item) {
                var track = item[0];
                var receiver = item[1];
                if (stream.id !== item[2].id) {
                  return;
                }
                fireAddTrack(pc, track, receiver, [stream]);
              });
            }
          });
          receiverList.forEach(function(item) {
            if (item[2]) {
              return;
            }
            fireAddTrack(pc, item[0], item[1], []);
          });
      
          // check whether addIceCandidate({}) was called within four seconds after
          // setRemoteDescription.
          window.setTimeout(function() {
            if (!(pc && pc.transceivers)) {
              return;
            }
            pc.transceivers.forEach(function(transceiver) {
              if (transceiver.iceTransport &&
                  transceiver.iceTransport.state === 'new' &&
                  transceiver.iceTransport.getRemoteCandidates().length > 0) {
                console.warn('Timeout for addRemoteCandidate. Consider sending ' +
                    'an end-of-candidates notification');
                transceiver.iceTransport.addRemoteCandidate({});
              }
            });
          }, 4000);
      
          return Promise.resolve();
        };
      
        RTCPeerConnection.prototype.close = function() {
          this.transceivers.forEach(function(transceiver) {
            /* not yet
            if (transceiver.iceGatherer) {
              transceiver.iceGatherer.close();
            }
            */
            if (transceiver.iceTransport) {
              transceiver.iceTransport.stop();
            }
            if (transceiver.dtlsTransport) {
              transceiver.dtlsTransport.stop();
            }
            if (transceiver.rtpSender) {
              transceiver.rtpSender.stop();
            }
            if (transceiver.rtpReceiver) {
              transceiver.rtpReceiver.stop();
            }
          });
          // FIXME: clean up tracks, local streams, remote streams, etc
          this._isClosed = true;
          this._updateSignalingState('closed');
        };
      
        // Update the signaling state.
        RTCPeerConnection.prototype._updateSignalingState = function(newState) {
          this.signalingState = newState;
          var event = new Event('signalingstatechange');
          this._dispatchEvent('signalingstatechange', event);
        };
      
        // Determine whether to fire the negotiationneeded event.
        RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
          var pc = this;
          if (this.signalingState !== 'stable' || this.needNegotiation === true) {
            return;
          }
          this.needNegotiation = true;
          window.setTimeout(function() {
            if (pc.needNegotiation) {
              pc.needNegotiation = false;
              var event = new Event('negotiationneeded');
              pc._dispatchEvent('negotiationneeded', event);
            }
          }, 0);
        };
      
        // Update the ice connection state.
        RTCPeerConnection.prototype._updateIceConnectionState = function() {
          var newState;
          var states = {
            'new': 0,
            closed: 0,
            checking: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && !transceiver.rejected) {
              states[transceiver.iceTransport.state]++;
            }
          });
      
          newState = 'new';
          if (states.failed > 0) {
            newState = 'failed';
          } else if (states.checking > 0) {
            newState = 'checking';
          } else if (states.disconnected > 0) {
            newState = 'disconnected';
          } else if (states.new > 0) {
            newState = 'new';
          } else if (states.connected > 0) {
            newState = 'connected';
          } else if (states.completed > 0) {
            newState = 'completed';
          }
      
          if (newState !== this.iceConnectionState) {
            this.iceConnectionState = newState;
            var event = new Event('iceconnectionstatechange');
            this._dispatchEvent('iceconnectionstatechange', event);
          }
        };
      
        // Update the connection state.
        RTCPeerConnection.prototype._updateConnectionState = function() {
          var newState;
          var states = {
            'new': 0,
            closed: 0,
            connecting: 0,
            connected: 0,
            completed: 0,
            disconnected: 0,
            failed: 0
          };
          this.transceivers.forEach(function(transceiver) {
            if (transceiver.iceTransport && transceiver.dtlsTransport &&
                !transceiver.rejected) {
              states[transceiver.iceTransport.state]++;
              states[transceiver.dtlsTransport.state]++;
            }
          });
          // ICETransport.completed and connected are the same for this purpose.
          states.connected += states.completed;
      
          newState = 'new';
          if (states.failed > 0) {
            newState = 'failed';
          } else if (states.connecting > 0) {
            newState = 'connecting';
          } else if (states.disconnected > 0) {
            newState = 'disconnected';
          } else if (states.new > 0) {
            newState = 'new';
          } else if (states.connected > 0) {
            newState = 'connected';
          }
      
          if (newState !== this.connectionState) {
            this.connectionState = newState;
            var event = new Event('connectionstatechange');
            this._dispatchEvent('connectionstatechange', event);
          }
        };
      
        RTCPeerConnection.prototype.createOffer = function() {
          var pc = this;
      
          if (pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError',
                'Can not call createOffer after close'));
          }
      
          var numAudioTracks = pc.transceivers.filter(function(t) {
            return t.kind === 'audio';
          }).length;
          var numVideoTracks = pc.transceivers.filter(function(t) {
            return t.kind === 'video';
          }).length;
      
          // Determine number of audio and video tracks we need to send/recv.
          var offerOptions = arguments[0];
          if (offerOptions) {
            // Reject Chrome legacy constraints.
            if (offerOptions.mandatory || offerOptions.optional) {
              throw new TypeError(
                  'Legacy mandatory/optional constraints not supported.');
            }
            if (offerOptions.offerToReceiveAudio !== undefined) {
              if (offerOptions.offerToReceiveAudio === true) {
                numAudioTracks = 1;
              } else if (offerOptions.offerToReceiveAudio === false) {
                numAudioTracks = 0;
              } else {
                numAudioTracks = offerOptions.offerToReceiveAudio;
              }
            }
            if (offerOptions.offerToReceiveVideo !== undefined) {
              if (offerOptions.offerToReceiveVideo === true) {
                numVideoTracks = 1;
              } else if (offerOptions.offerToReceiveVideo === false) {
                numVideoTracks = 0;
              } else {
                numVideoTracks = offerOptions.offerToReceiveVideo;
              }
            }
          }
      
          pc.transceivers.forEach(function(transceiver) {
            if (transceiver.kind === 'audio') {
              numAudioTracks--;
              if (numAudioTracks < 0) {
                transceiver.wantReceive = false;
              }
            } else if (transceiver.kind === 'video') {
              numVideoTracks--;
              if (numVideoTracks < 0) {
                transceiver.wantReceive = false;
              }
            }
          });
      
          // Create M-lines for recvonly streams.
          while (numAudioTracks > 0 || numVideoTracks > 0) {
            if (numAudioTracks > 0) {
              pc._createTransceiver('audio');
              numAudioTracks--;
            }
            if (numVideoTracks > 0) {
              pc._createTransceiver('video');
              numVideoTracks--;
            }
          }
      
          var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
              pc._sdpSessionVersion++);
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            // For each track, create an ice gatherer, ice transport,
            // dtls transport, potentially rtpsender and rtpreceiver.
            var track = transceiver.track;
            var kind = transceiver.kind;
            var mid = transceiver.mid || SDPUtils.generateIdentifier();
            transceiver.mid = mid;
      
            if (!transceiver.iceGatherer) {
              transceiver.iceGatherer = pc._createIceGatherer(sdpMLineIndex,
                  pc.usingBundle);
            }
      
            var localCapabilities = window.RTCRtpSender.getCapabilities(kind);
            // filter RTX until additional stuff needed for RTX is implemented
            // in adapter.js
            if (edgeVersion < 15019) {
              localCapabilities.codecs = localCapabilities.codecs.filter(
                  function(codec) {
                    return codec.name !== 'rtx';
                  });
            }
            localCapabilities.codecs.forEach(function(codec) {
              // work around https://bugs.chromium.org/p/webrtc/issues/detail?id=6552
              // by adding level-asymmetry-allowed=1
              if (codec.name === 'H264' &&
                  codec.parameters['level-asymmetry-allowed'] === undefined) {
                codec.parameters['level-asymmetry-allowed'] = '1';
              }
      
              // for subsequent offers, we might have to re-use the payload
              // type of the last offer.
              if (transceiver.remoteCapabilities &&
                  transceiver.remoteCapabilities.codecs) {
                transceiver.remoteCapabilities.codecs.forEach(function(remoteCodec) {
                  if (codec.name.toLowerCase() === remoteCodec.name.toLowerCase() &&
                      codec.clockRate === remoteCodec.clockRate) {
                    codec.preferredPayloadType = remoteCodec.payloadType;
                  }
                });
              }
            });
            localCapabilities.headerExtensions.forEach(function(hdrExt) {
              var remoteExtensions = transceiver.remoteCapabilities &&
                  transceiver.remoteCapabilities.headerExtensions || [];
              remoteExtensions.forEach(function(rHdrExt) {
                if (hdrExt.uri === rHdrExt.uri) {
                  hdrExt.id = rHdrExt.id;
                }
              });
            });
      
            // generate an ssrc now, to be used later in rtpSender.send
            var sendEncodingParameters = transceiver.sendEncodingParameters || [{
              ssrc: (2 * sdpMLineIndex + 1) * 1001
            }];
            if (track) {
              // add RTX
              if (edgeVersion >= 15019 && kind === 'video' &&
                  !sendEncodingParameters[0].rtx) {
                sendEncodingParameters[0].rtx = {
                  ssrc: sendEncodingParameters[0].ssrc + 1
                };
              }
            }
      
            if (transceiver.wantReceive) {
              transceiver.rtpReceiver = new window.RTCRtpReceiver(
                  transceiver.dtlsTransport, kind);
            }
      
            transceiver.localCapabilities = localCapabilities;
            transceiver.sendEncodingParameters = sendEncodingParameters;
          });
      
          // always offer BUNDLE and dispose on return if not supported.
          if (pc._config.bundlePolicy !== 'max-compat') {
            sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
              return t.mid;
            }).join(' ') + '\r\n';
          }
          sdp += 'a=ice-options:trickle\r\n';
      
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            sdp += writeMediaSection(transceiver, transceiver.localCapabilities,
                'offer', transceiver.stream, pc._dtlsRole);
            sdp += 'a=rtcp-rsize\r\n';
      
            if (transceiver.iceGatherer && pc.iceGatheringState !== 'new' &&
                (sdpMLineIndex === 0 || !pc.usingBundle)) {
              transceiver.iceGatherer.getLocalCandidates().forEach(function(cand) {
                cand.component = 1;
                sdp += 'a=' + SDPUtils.writeCandidate(cand) + '\r\n';
              });
      
              if (transceiver.iceGatherer.state === 'completed') {
                sdp += 'a=end-of-candidates\r\n';
              }
            }
          });
      
          var desc = new window.RTCSessionDescription({
            type: 'offer',
            sdp: sdp
          });
          return Promise.resolve(desc);
        };
      
        RTCPeerConnection.prototype.createAnswer = function() {
          var pc = this;
      
          if (pc._isClosed) {
            return Promise.reject(makeError('InvalidStateError',
                'Can not call createAnswer after close'));
          }
      
          if (!(pc.signalingState === 'have-remote-offer' ||
              pc.signalingState === 'have-local-pranswer')) {
            return Promise.reject(makeError('InvalidStateError',
                'Can not call createAnswer in signalingState ' + pc.signalingState));
          }
      
          var sdp = SDPUtils.writeSessionBoilerplate(pc._sdpSessionId,
              pc._sdpSessionVersion++);
          if (pc.usingBundle) {
            sdp += 'a=group:BUNDLE ' + pc.transceivers.map(function(t) {
              return t.mid;
            }).join(' ') + '\r\n';
          }
          sdp += 'a=ice-options:trickle\r\n';
      
          var mediaSectionsInOffer = SDPUtils.getMediaSections(
              pc._remoteDescription.sdp).length;
          pc.transceivers.forEach(function(transceiver, sdpMLineIndex) {
            if (sdpMLineIndex + 1 > mediaSectionsInOffer) {
              return;
            }
            if (transceiver.rejected) {
              if (transceiver.kind === 'application') {
                if (transceiver.protocol === 'DTLS/SCTP') { // legacy fmt
                  sdp += 'm=application 0 DTLS/SCTP 5000\r\n';
                } else {
                  sdp += 'm=application 0 ' + transceiver.protocol +
                      ' webrtc-datachannel\r\n';
                }
              } else if (transceiver.kind === 'audio') {
                sdp += 'm=audio 0 UDP/TLS/RTP/SAVPF 0\r\n' +
                    'a=rtpmap:0 PCMU/8000\r\n';
              } else if (transceiver.kind === 'video') {
                sdp += 'm=video 0 UDP/TLS/RTP/SAVPF 120\r\n' +
                    'a=rtpmap:120 VP8/90000\r\n';
              }
              sdp += 'c=IN IP4 0.0.0.0\r\n' +
                  'a=inactive\r\n' +
                  'a=mid:' + transceiver.mid + '\r\n';
              return;
            }
      
            // FIXME: look at direction.
            if (transceiver.stream) {
              var localTrack;
              if (transceiver.kind === 'audio') {
                localTrack = transceiver.stream.getAudioTracks()[0];
              } else if (transceiver.kind === 'video') {
                localTrack = transceiver.stream.getVideoTracks()[0];
              }
              if (localTrack) {
                // add RTX
                if (edgeVersion >= 15019 && transceiver.kind === 'video' &&
                    !transceiver.sendEncodingParameters[0].rtx) {
                  transceiver.sendEncodingParameters[0].rtx = {
                    ssrc: transceiver.sendEncodingParameters[0].ssrc + 1
                  };
                }
              }
            }
      
            // Calculate intersection of capabilities.
            var commonCapabilities = getCommonCapabilities(
                transceiver.localCapabilities,
                transceiver.remoteCapabilities);
      
            var hasRtx = commonCapabilities.codecs.filter(function(c) {
              return c.name.toLowerCase() === 'rtx';
            }).length;
            if (!hasRtx && transceiver.sendEncodingParameters[0].rtx) {
              delete transceiver.sendEncodingParameters[0].rtx;
            }
      
            sdp += writeMediaSection(transceiver, commonCapabilities,
                'answer', transceiver.stream, pc._dtlsRole);
            if (transceiver.rtcpParameters &&
                transceiver.rtcpParameters.reducedSize) {
              sdp += 'a=rtcp-rsize\r\n';
            }
          });
      
          var desc = new window.RTCSessionDescription({
            type: 'answer',
            sdp: sdp
          });
          return Promise.resolve(desc);
        };
      
        RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
          var pc = this;
          var sections;
          if (candidate && !(candidate.sdpMLineIndex !== undefined ||
              candidate.sdpMid)) {
            return Promise.reject(new TypeError('sdpMLineIndex or sdpMid required'));
          }
      
          // TODO: needs to go into ops queue.
          return new Promise(function(resolve, reject) {
            if (!pc._remoteDescription) {
              return reject(makeError('InvalidStateError',
                  'Can not add ICE candidate without a remote description'));
            } else if (!candidate || candidate.candidate === '') {
              for (var j = 0; j < pc.transceivers.length; j++) {
                if (pc.transceivers[j].rejected) {
                  continue;
                }
                pc.transceivers[j].iceTransport.addRemoteCandidate({});
                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                sections[j] += 'a=end-of-candidates\r\n';
                pc._remoteDescription.sdp =
                    SDPUtils.getDescription(pc._remoteDescription.sdp) +
                    sections.join('');
                if (pc.usingBundle) {
                  break;
                }
              }
            } else {
              var sdpMLineIndex = candidate.sdpMLineIndex;
              if (candidate.sdpMid) {
                for (var i = 0; i < pc.transceivers.length; i++) {
                  if (pc.transceivers[i].mid === candidate.sdpMid) {
                    sdpMLineIndex = i;
                    break;
                  }
                }
              }
              var transceiver = pc.transceivers[sdpMLineIndex];
              if (transceiver) {
                if (transceiver.rejected) {
                  return resolve();
                }
                var cand = Object.keys(candidate.candidate).length > 0 ?
                    SDPUtils.parseCandidate(candidate.candidate) : {};
                // Ignore Chrome's invalid candidates since Edge does not like them.
                if (cand.protocol === 'tcp' && (cand.port === 0 || cand.port === 9)) {
                  return resolve();
                }
                // Ignore RTCP candidates, we assume RTCP-MUX.
                if (cand.component && cand.component !== 1) {
                  return resolve();
                }
                // when using bundle, avoid adding candidates to the wrong
                // ice transport. And avoid adding candidates added in the SDP.
                if (sdpMLineIndex === 0 || (sdpMLineIndex > 0 &&
                    transceiver.iceTransport !== pc.transceivers[0].iceTransport)) {
                  if (!maybeAddCandidate(transceiver.iceTransport, cand)) {
                    return reject(makeError('OperationError',
                        'Can not add ICE candidate'));
                  }
                }
      
                // update the remoteDescription.
                var candidateString = candidate.candidate.trim();
                if (candidateString.indexOf('a=') === 0) {
                  candidateString = candidateString.substr(2);
                }
                sections = SDPUtils.getMediaSections(pc._remoteDescription.sdp);
                sections[sdpMLineIndex] += 'a=' +
                    (cand.type ? candidateString : 'end-of-candidates')
                    + '\r\n';
                pc._remoteDescription.sdp =
                    SDPUtils.getDescription(pc._remoteDescription.sdp) +
                    sections.join('');
              } else {
                return reject(makeError('OperationError',
                    'Can not add ICE candidate'));
              }
            }
            resolve();
          });
        };
      
        RTCPeerConnection.prototype.getStats = function(selector) {
          if (selector && selector instanceof window.MediaStreamTrack) {
            var senderOrReceiver = null;
            this.transceivers.forEach(function(transceiver) {
              if (transceiver.rtpSender &&
                  transceiver.rtpSender.track === selector) {
                senderOrReceiver = transceiver.rtpSender;
              } else if (transceiver.rtpReceiver &&
                  transceiver.rtpReceiver.track === selector) {
                senderOrReceiver = transceiver.rtpReceiver;
              }
            });
            if (!senderOrReceiver) {
              throw makeError('InvalidAccessError', 'Invalid selector.');
            }
            return senderOrReceiver.getStats();
          }
      
          var promises = [];
          this.transceivers.forEach(function(transceiver) {
            ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport',
                'dtlsTransport'].forEach(function(method) {
                  if (transceiver[method]) {
                    promises.push(transceiver[method].getStats());
                  }
                });
          });
          return Promise.all(promises).then(function(allStats) {
            var results = new Map();
            allStats.forEach(function(stats) {
              stats.forEach(function(stat) {
                results.set(stat.id, stat);
              });
            });
            return results;
          });
        };
      
        // fix low-level stat names and return Map instead of object.
        var ortcObjects = ['RTCRtpSender', 'RTCRtpReceiver', 'RTCIceGatherer',
          'RTCIceTransport', 'RTCDtlsTransport'];
        ortcObjects.forEach(function(ortcObjectName) {
          var obj = window[ortcObjectName];
          if (obj && obj.prototype && obj.prototype.getStats) {
            var nativeGetstats = obj.prototype.getStats;
            obj.prototype.getStats = function() {
              return nativeGetstats.apply(this)
              .then(function(nativeStats) {
                var mapStats = new Map();
                Object.keys(nativeStats).forEach(function(id) {
                  nativeStats[id].type = fixStatsType(nativeStats[id]);
                  mapStats.set(id, nativeStats[id]);
                });
                return mapStats;
              });
            };
          }
        });
      
        // legacy callback shims. Should be moved to adapter.js some days.
        var methods = ['createOffer', 'createAnswer'];
        methods.forEach(function(method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[0] === 'function' ||
                typeof args[1] === 'function') { // legacy
              return nativeMethod.apply(this, [arguments[2]])
              .then(function(description) {
                if (typeof args[0] === 'function') {
                  args[0].apply(null, [description]);
                }
              }, function(error) {
                if (typeof args[1] === 'function') {
                  args[1].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
      
        methods = ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'];
        methods.forEach(function(method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === 'function' ||
                typeof args[2] === 'function') { // legacy
              return nativeMethod.apply(this, arguments)
              .then(function() {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              }, function(error) {
                if (typeof args[2] === 'function') {
                  args[2].apply(null, [error]);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
      
        // getStats is special. It doesn't have a spec legacy method yet we support
        // getStats(something, cb) without error callbacks.
        ['getStats'].forEach(function(method) {
          var nativeMethod = RTCPeerConnection.prototype[method];
          RTCPeerConnection.prototype[method] = function() {
            var args = arguments;
            if (typeof args[1] === 'function') {
              return nativeMethod.apply(this, arguments)
              .then(function() {
                if (typeof args[1] === 'function') {
                  args[1].apply(null);
                }
              });
            }
            return nativeMethod.apply(this, arguments);
          };
        });
      
        return RTCPeerConnection;
      };
      
      },{"sdp":17}],17:[function(require,module,exports){
      /* eslint-env node */
      'use strict';
      
      // SDP helpers.
      var SDPUtils = {};
      
      // Generate an alphanumeric identifier for cname or mids.
      // TODO: use UUIDs instead? https://gist.github.com/jed/982883
      SDPUtils.generateIdentifier = function() {
        return Math.random().toString(36).substr(2, 10);
      };
      
      // The RTCP CNAME used by all peerconnections from the same JS.
      SDPUtils.localCName = SDPUtils.generateIdentifier();
      
      // Splits SDP into lines, dealing with both CRLF and LF.
      SDPUtils.splitLines = function(blob) {
        return blob.trim().split('\n').map(function(line) {
          return line.trim();
        });
      };
      // Splits SDP into sessionpart and mediasections. Ensures CRLF.
      SDPUtils.splitSections = function(blob) {
        var parts = blob.split('\nm=');
        return parts.map(function(part, index) {
          return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
        });
      };
      
      // returns the session description.
      SDPUtils.getDescription = function(blob) {
        var sections = SDPUtils.splitSections(blob);
        return sections && sections[0];
      };
      
      // returns the individual media sections.
      SDPUtils.getMediaSections = function(blob) {
        var sections = SDPUtils.splitSections(blob);
        sections.shift();
        return sections;
      };
      
      // Returns lines that start with a certain prefix.
      SDPUtils.matchPrefix = function(blob, prefix) {
        return SDPUtils.splitLines(blob).filter(function(line) {
          return line.indexOf(prefix) === 0;
        });
      };
      
      // Parses an ICE candidate line. Sample input:
      // candidate:702786350 2 udp 41819902 8.8.8.8 60769 typ relay raddr 8.8.8.8
      // rport 55996"
      SDPUtils.parseCandidate = function(line) {
        var parts;
        // Parse both variants.
        if (line.indexOf('a=candidate:') === 0) {
          parts = line.substring(12).split(' ');
        } else {
          parts = line.substring(10).split(' ');
        }
      
        var candidate = {
          foundation: parts[0],
          component: parseInt(parts[1], 10),
          protocol: parts[2].toLowerCase(),
          priority: parseInt(parts[3], 10),
          ip: parts[4],
          address: parts[4], // address is an alias for ip.
          port: parseInt(parts[5], 10),
          // skip parts[6] == 'typ'
          type: parts[7]
        };
      
        for (var i = 8; i < parts.length; i += 2) {
          switch (parts[i]) {
            case 'raddr':
              candidate.relatedAddress = parts[i + 1];
              break;
            case 'rport':
              candidate.relatedPort = parseInt(parts[i + 1], 10);
              break;
            case 'tcptype':
              candidate.tcpType = parts[i + 1];
              break;
            case 'ufrag':
              candidate.ufrag = parts[i + 1]; // for backward compability.
              candidate.usernameFragment = parts[i + 1];
              break;
            default: // extension handling, in particular ufrag
              candidate[parts[i]] = parts[i + 1];
              break;
          }
        }
        return candidate;
      };
      
      // Translates a candidate object into SDP candidate attribute.
      SDPUtils.writeCandidate = function(candidate) {
        var sdp = [];
        sdp.push(candidate.foundation);
        sdp.push(candidate.component);
        sdp.push(candidate.protocol.toUpperCase());
        sdp.push(candidate.priority);
        sdp.push(candidate.address || candidate.ip);
        sdp.push(candidate.port);
      
        var type = candidate.type;
        sdp.push('typ');
        sdp.push(type);
        if (type !== 'host' && candidate.relatedAddress &&
            candidate.relatedPort) {
          sdp.push('raddr');
          sdp.push(candidate.relatedAddress);
          sdp.push('rport');
          sdp.push(candidate.relatedPort);
        }
        if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
          sdp.push('tcptype');
          sdp.push(candidate.tcpType);
        }
        if (candidate.usernameFragment || candidate.ufrag) {
          sdp.push('ufrag');
          sdp.push(candidate.usernameFragment || candidate.ufrag);
        }
        return 'candidate:' + sdp.join(' ');
      };
      
      // Parses an ice-options line, returns an array of option tags.
      // a=ice-options:foo bar
      SDPUtils.parseIceOptions = function(line) {
        return line.substr(14).split(' ');
      };
      
      // Parses an rtpmap line, returns RTCRtpCoddecParameters. Sample input:
      // a=rtpmap:111 opus/48000/2
      SDPUtils.parseRtpMap = function(line) {
        var parts = line.substr(9).split(' ');
        var parsed = {
          payloadType: parseInt(parts.shift(), 10) // was: id
        };
      
        parts = parts[0].split('/');
      
        parsed.name = parts[0];
        parsed.clockRate = parseInt(parts[1], 10); // was: clockrate
        parsed.channels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
        // legacy alias, got renamed back to channels in ORTC.
        parsed.numChannels = parsed.channels;
        return parsed;
      };
      
      // Generate an a=rtpmap line from RTCRtpCodecCapability or
      // RTCRtpCodecParameters.
      SDPUtils.writeRtpMap = function(codec) {
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        var channels = codec.channels || codec.numChannels || 1;
        return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate +
            (channels !== 1 ? '/' + channels : '') + '\r\n';
      };
      
      // Parses an a=extmap line (headerextension from RFC 5285). Sample input:
      // a=extmap:2 urn:ietf:params:rtp-hdrext:toffset
      // a=extmap:2/sendonly urn:ietf:params:rtp-hdrext:toffset
      SDPUtils.parseExtmap = function(line) {
        var parts = line.substr(9).split(' ');
        return {
          id: parseInt(parts[0], 10),
          direction: parts[0].indexOf('/') > 0 ? parts[0].split('/')[1] : 'sendrecv',
          uri: parts[1]
        };
      };
      
      // Generates a=extmap line from RTCRtpHeaderExtensionParameters or
      // RTCRtpHeaderExtension.
      SDPUtils.writeExtmap = function(headerExtension) {
        return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) +
            (headerExtension.direction && headerExtension.direction !== 'sendrecv'
              ? '/' + headerExtension.direction
              : '') +
            ' ' + headerExtension.uri + '\r\n';
      };
      
      // Parses an ftmp line, returns dictionary. Sample input:
      // a=fmtp:96 vbr=on;cng=on
      // Also deals with vbr=on; cng=on
      SDPUtils.parseFmtp = function(line) {
        var parsed = {};
        var kv;
        var parts = line.substr(line.indexOf(' ') + 1).split(';');
        for (var j = 0; j < parts.length; j++) {
          kv = parts[j].trim().split('=');
          parsed[kv[0].trim()] = kv[1];
        }
        return parsed;
      };
      
      // Generates an a=ftmp line from RTCRtpCodecCapability or RTCRtpCodecParameters.
      SDPUtils.writeFmtp = function(codec) {
        var line = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.parameters && Object.keys(codec.parameters).length) {
          var params = [];
          Object.keys(codec.parameters).forEach(function(param) {
            if (codec.parameters[param]) {
              params.push(param + '=' + codec.parameters[param]);
            } else {
              params.push(param);
            }
          });
          line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
        }
        return line;
      };
      
      // Parses an rtcp-fb line, returns RTCPRtcpFeedback object. Sample input:
      // a=rtcp-fb:98 nack rpsi
      SDPUtils.parseRtcpFb = function(line) {
        var parts = line.substr(line.indexOf(' ') + 1).split(' ');
        return {
          type: parts.shift(),
          parameter: parts.join(' ')
        };
      };
      // Generate a=rtcp-fb lines from RTCRtpCodecCapability or RTCRtpCodecParameters.
      SDPUtils.writeRtcpFb = function(codec) {
        var lines = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
          // FIXME: special handling for trr-int?
          codec.rtcpFeedback.forEach(function(fb) {
            lines += 'a=rtcp-fb:' + pt + ' ' + fb.type +
            (fb.parameter && fb.parameter.length ? ' ' + fb.parameter : '') +
                '\r\n';
          });
        }
        return lines;
      };
      
      // Parses an RFC 5576 ssrc media attribute. Sample input:
      // a=ssrc:3735928559 cname:something
      SDPUtils.parseSsrcMedia = function(line) {
        var sp = line.indexOf(' ');
        var parts = {
          ssrc: parseInt(line.substr(7, sp - 7), 10)
        };
        var colon = line.indexOf(':', sp);
        if (colon > -1) {
          parts.attribute = line.substr(sp + 1, colon - sp - 1);
          parts.value = line.substr(colon + 1);
        } else {
          parts.attribute = line.substr(sp + 1);
        }
        return parts;
      };
      
      SDPUtils.parseSsrcGroup = function(line) {
        var parts = line.substr(13).split(' ');
        return {
          semantics: parts.shift(),
          ssrcs: parts.map(function(ssrc) {
            return parseInt(ssrc, 10);
          })
        };
      };
      
      // Extracts the MID (RFC 5888) from a media section.
      // returns the MID or undefined if no mid line was found.
      SDPUtils.getMid = function(mediaSection) {
        var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:')[0];
        if (mid) {
          return mid.substr(6);
        }
      };
      
      SDPUtils.parseFingerprint = function(line) {
        var parts = line.substr(14).split(' ');
        return {
          algorithm: parts[0].toLowerCase(), // algorithm is case-sensitive in Edge.
          value: parts[1]
        };
      };
      
      // Extracts DTLS parameters from SDP media section or sessionpart.
      // FIXME: for consistency with other functions this should only
      //   get the fingerprint line as input. See also getIceParameters.
      SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
          'a=fingerprint:');
        // Note: a=setup line is ignored since we use the 'auto' role.
        // Note2: 'algorithm' is not case sensitive except in Edge.
        return {
          role: 'auto',
          fingerprints: lines.map(SDPUtils.parseFingerprint)
        };
      };
      
      // Serializes DTLS parameters to SDP.
      SDPUtils.writeDtlsParameters = function(params, setupType) {
        var sdp = 'a=setup:' + setupType + '\r\n';
        params.fingerprints.forEach(function(fp) {
          sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
        });
        return sdp;
      };
      
      // Parses a=crypto lines into
      //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#dictionary-rtcsrtpsdesparameters-members
      SDPUtils.parseCryptoLine = function(line) {
        var parts = line.substr(9).split(' ');
        return {
          tag: parseInt(parts[0], 10),
          cryptoSuite: parts[1],
          keyParams: parts[2],
          sessionParams: parts.slice(3),
        };
      };
      
      SDPUtils.writeCryptoLine = function(parameters) {
        return 'a=crypto:' + parameters.tag + ' ' +
          parameters.cryptoSuite + ' ' +
          (typeof parameters.keyParams === 'object'
            ? SDPUtils.writeCryptoKeyParams(parameters.keyParams)
            : parameters.keyParams) +
          (parameters.sessionParams ? ' ' + parameters.sessionParams.join(' ') : '') +
          '\r\n';
      };
      
      // Parses the crypto key parameters into
      //   https://rawgit.com/aboba/edgertc/master/msortc-rs4.html#rtcsrtpkeyparam*
      SDPUtils.parseCryptoKeyParams = function(keyParams) {
        if (keyParams.indexOf('inline:') !== 0) {
          return null;
        }
        var parts = keyParams.substr(7).split('|');
        return {
          keyMethod: 'inline',
          keySalt: parts[0],
          lifeTime: parts[1],
          mkiValue: parts[2] ? parts[2].split(':')[0] : undefined,
          mkiLength: parts[2] ? parts[2].split(':')[1] : undefined,
        };
      };
      
      SDPUtils.writeCryptoKeyParams = function(keyParams) {
        return keyParams.keyMethod + ':'
          + keyParams.keySalt +
          (keyParams.lifeTime ? '|' + keyParams.lifeTime : '') +
          (keyParams.mkiValue && keyParams.mkiLength
            ? '|' + keyParams.mkiValue + ':' + keyParams.mkiLength
            : '');
      };
      
      // Extracts all SDES paramters.
      SDPUtils.getCryptoParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils.matchPrefix(mediaSection + sessionpart,
          'a=crypto:');
        return lines.map(SDPUtils.parseCryptoLine);
      };
      
      // Parses ICE information from SDP media section or sessionpart.
      // FIXME: for consistency with other functions this should only
      //   get the ice-ufrag and ice-pwd lines as input.
      SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
        var ufrag = SDPUtils.matchPrefix(mediaSection + sessionpart,
          'a=ice-ufrag:')[0];
        var pwd = SDPUtils.matchPrefix(mediaSection + sessionpart,
          'a=ice-pwd:')[0];
        if (!(ufrag && pwd)) {
          return null;
        }
        return {
          usernameFragment: ufrag.substr(12),
          password: pwd.substr(10),
        };
      };
      
      // Serializes ICE parameters to SDP.
      SDPUtils.writeIceParameters = function(params) {
        return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' +
            'a=ice-pwd:' + params.password + '\r\n';
      };
      
      // Parses the SDP media section and returns RTCRtpParameters.
      SDPUtils.parseRtpParameters = function(mediaSection) {
        var description = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: []
        };
        var lines = SDPUtils.splitLines(mediaSection);
        var mline = lines[0].split(' ');
        for (var i = 3; i < mline.length; i++) { // find all codecs from mline[3..]
          var pt = mline[i];
          var rtpmapline = SDPUtils.matchPrefix(
            mediaSection, 'a=rtpmap:' + pt + ' ')[0];
          if (rtpmapline) {
            var codec = SDPUtils.parseRtpMap(rtpmapline);
            var fmtps = SDPUtils.matchPrefix(
              mediaSection, 'a=fmtp:' + pt + ' ');
            // Only the first a=fmtp:<pt> is considered.
            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils.matchPrefix(
              mediaSection, 'a=rtcp-fb:' + pt + ' ')
              .map(SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            // parse FEC mechanisms from rtpmap lines.
            switch (codec.name.toUpperCase()) {
              case 'RED':
              case 'ULPFEC':
                description.fecMechanisms.push(codec.name.toUpperCase());
                break;
              default: // only RED and ULPFEC are recognized as FEC mechanisms.
                break;
            }
          }
        }
        SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
          description.headerExtensions.push(SDPUtils.parseExtmap(line));
        });
        // FIXME: parse rtcp.
        return description;
      };
      
      // Generates parts of the SDP media section describing the capabilities /
      // parameters.
      SDPUtils.writeRtpDescription = function(kind, caps) {
        var sdp = '';
      
        // Build the mline.
        sdp += 'm=' + kind + ' ';
        sdp += caps.codecs.length > 0 ? '9' : '0'; // reject if no codecs.
        sdp += ' UDP/TLS/RTP/SAVPF ';
        sdp += caps.codecs.map(function(codec) {
          if (codec.preferredPayloadType !== undefined) {
            return codec.preferredPayloadType;
          }
          return codec.payloadType;
        }).join(' ') + '\r\n';
      
        sdp += 'c=IN IP4 0.0.0.0\r\n';
        sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
      
        // Add a=rtpmap lines for each codec. Also fmtp and rtcp-fb.
        caps.codecs.forEach(function(codec) {
          sdp += SDPUtils.writeRtpMap(codec);
          sdp += SDPUtils.writeFmtp(codec);
          sdp += SDPUtils.writeRtcpFb(codec);
        });
        var maxptime = 0;
        caps.codecs.forEach(function(codec) {
          if (codec.maxptime > maxptime) {
            maxptime = codec.maxptime;
          }
        });
        if (maxptime > 0) {
          sdp += 'a=maxptime:' + maxptime + '\r\n';
        }
        sdp += 'a=rtcp-mux\r\n';
      
        if (caps.headerExtensions) {
          caps.headerExtensions.forEach(function(extension) {
            sdp += SDPUtils.writeExtmap(extension);
          });
        }
        // FIXME: write fecMechanisms.
        return sdp;
      };
      
      // Parses the SDP media section and returns an array of
      // RTCRtpEncodingParameters.
      SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
        var encodingParameters = [];
        var description = SDPUtils.parseRtpParameters(mediaSection);
        var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
        var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
      
        // filter a=ssrc:... cname:, ignore PlanB-msid
        var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
          .map(function(line) {
            return SDPUtils.parseSsrcMedia(line);
          })
          .filter(function(parts) {
            return parts.attribute === 'cname';
          });
        var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
        var secondarySsrc;
      
        var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID')
          .map(function(line) {
            var parts = line.substr(17).split(' ');
            return parts.map(function(part) {
              return parseInt(part, 10);
            });
          });
        if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
          secondarySsrc = flows[0][1];
        }
      
        description.codecs.forEach(function(codec) {
          if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
            var encParam = {
              ssrc: primarySsrc,
              codecPayloadType: parseInt(codec.parameters.apt, 10)
            };
            if (primarySsrc && secondarySsrc) {
              encParam.rtx = {ssrc: secondarySsrc};
            }
            encodingParameters.push(encParam);
            if (hasRed) {
              encParam = JSON.parse(JSON.stringify(encParam));
              encParam.fec = {
                ssrc: primarySsrc,
                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
              };
              encodingParameters.push(encParam);
            }
          }
        });
        if (encodingParameters.length === 0 && primarySsrc) {
          encodingParameters.push({
            ssrc: primarySsrc
          });
        }
      
        // we support both b=AS and b=TIAS but interpret AS as TIAS.
        var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
        if (bandwidth.length) {
          if (bandwidth[0].indexOf('b=TIAS:') === 0) {
            bandwidth = parseInt(bandwidth[0].substr(7), 10);
          } else if (bandwidth[0].indexOf('b=AS:') === 0) {
            // use formula from JSEP to convert b=AS to TIAS value.
            bandwidth = parseInt(bandwidth[0].substr(5), 10) * 1000 * 0.95
                - (50 * 40 * 8);
          } else {
            bandwidth = undefined;
          }
          encodingParameters.forEach(function(params) {
            params.maxBitrate = bandwidth;
          });
        }
        return encodingParameters;
      };
      
      // parses http://draft.ortc.org/#rtcrtcpparameters*
      SDPUtils.parseRtcpParameters = function(mediaSection) {
        var rtcpParameters = {};
      
        // Gets the first SSRC. Note tha with RTX there might be multiple
        // SSRCs.
        var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
          .map(function(line) {
            return SDPUtils.parseSsrcMedia(line);
          })
          .filter(function(obj) {
            return obj.attribute === 'cname';
          })[0];
        if (remoteSsrc) {
          rtcpParameters.cname = remoteSsrc.value;
          rtcpParameters.ssrc = remoteSsrc.ssrc;
        }
      
        // Edge uses the compound attribute instead of reducedSize
        // compound is !reducedSize
        var rsize = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-rsize');
        rtcpParameters.reducedSize = rsize.length > 0;
        rtcpParameters.compound = rsize.length === 0;
      
        // parses the rtcp-mux attrіbute.
        // Note that Edge does not support unmuxed RTCP.
        var mux = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-mux');
        rtcpParameters.mux = mux.length > 0;
      
        return rtcpParameters;
      };
      
      // parses either a=msid: or a=ssrc:... msid lines and returns
      // the id of the MediaStream and MediaStreamTrack.
      SDPUtils.parseMsid = function(mediaSection) {
        var parts;
        var spec = SDPUtils.matchPrefix(mediaSection, 'a=msid:');
        if (spec.length === 1) {
          parts = spec[0].substr(7).split(' ');
          return {stream: parts[0], track: parts[1]};
        }
        var planB = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:')
          .map(function(line) {
            return SDPUtils.parseSsrcMedia(line);
          })
          .filter(function(msidParts) {
            return msidParts.attribute === 'msid';
          });
        if (planB.length > 0) {
          parts = planB[0].value.split(' ');
          return {stream: parts[0], track: parts[1]};
        }
      };
      
      // SCTP
      // parses draft-ietf-mmusic-sctp-sdp-26 first and falls back
      // to draft-ietf-mmusic-sctp-sdp-05
      SDPUtils.parseSctpDescription = function(mediaSection) {
        var mline = SDPUtils.parseMLine(mediaSection);
        var maxSizeLine = SDPUtils.matchPrefix(mediaSection, 'a=max-message-size:');
        var maxMessageSize;
        if (maxSizeLine.length > 0) {
          maxMessageSize = parseInt(maxSizeLine[0].substr(19), 10);
        }
        if (isNaN(maxMessageSize)) {
          maxMessageSize = 65536;
        }
        var sctpPort = SDPUtils.matchPrefix(mediaSection, 'a=sctp-port:');
        if (sctpPort.length > 0) {
          return {
            port: parseInt(sctpPort[0].substr(12), 10),
            protocol: mline.fmt,
            maxMessageSize: maxMessageSize
          };
        }
        var sctpMapLines = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:');
        if (sctpMapLines.length > 0) {
          var parts = SDPUtils.matchPrefix(mediaSection, 'a=sctpmap:')[0]
            .substr(10)
            .split(' ');
          return {
            port: parseInt(parts[0], 10),
            protocol: parts[1],
            maxMessageSize: maxMessageSize
          };
        }
      };
      
      // SCTP
      // outputs the draft-ietf-mmusic-sctp-sdp-26 version that all browsers
      // support by now receiving in this format, unless we originally parsed
      // as the draft-ietf-mmusic-sctp-sdp-05 format (indicated by the m-line
      // protocol of DTLS/SCTP -- without UDP/ or TCP/)
      SDPUtils.writeSctpDescription = function(media, sctp) {
        var output = [];
        if (media.protocol !== 'DTLS/SCTP') {
          output = [
            'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.protocol + '\r\n',
            'c=IN IP4 0.0.0.0\r\n',
            'a=sctp-port:' + sctp.port + '\r\n'
          ];
        } else {
          output = [
            'm=' + media.kind + ' 9 ' + media.protocol + ' ' + sctp.port + '\r\n',
            'c=IN IP4 0.0.0.0\r\n',
            'a=sctpmap:' + sctp.port + ' ' + sctp.protocol + ' 65535\r\n'
          ];
        }
        if (sctp.maxMessageSize !== undefined) {
          output.push('a=max-message-size:' + sctp.maxMessageSize + '\r\n');
        }
        return output.join('');
      };
      
      // Generate a session ID for SDP.
      // https://tools.ietf.org/html/draft-ietf-rtcweb-jsep-20#section-5.2.1
      // recommends using a cryptographically random +ve 64-bit value
      // but right now this should be acceptable and within the right range
      SDPUtils.generateSessionId = function() {
        return Math.random().toString().substr(2, 21);
      };
      
      // Write boilder plate for start of SDP
      // sessId argument is optional - if not supplied it will
      // be generated randomly
      // sessVersion is optional and defaults to 2
      // sessUser is optional and defaults to 'thisisadapterortc'
      SDPUtils.writeSessionBoilerplate = function(sessId, sessVer, sessUser) {
        var sessionId;
        var version = sessVer !== undefined ? sessVer : 2;
        if (sessId) {
          sessionId = sessId;
        } else {
          sessionId = SDPUtils.generateSessionId();
        }
        var user = sessUser || 'thisisadapterortc';
        // FIXME: sess-id should be an NTP timestamp.
        return 'v=0\r\n' +
            'o=' + user + ' ' + sessionId + ' ' + version +
              ' IN IP4 127.0.0.1\r\n' +
            's=-\r\n' +
            't=0 0\r\n';
      };
      
      SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
      
        // Map ICE parameters (ufrag, pwd) to SDP.
        sdp += SDPUtils.writeIceParameters(
          transceiver.iceGatherer.getLocalParameters());
      
        // Map DTLS parameters to SDP.
        sdp += SDPUtils.writeDtlsParameters(
          transceiver.dtlsTransport.getLocalParameters(),
          type === 'offer' ? 'actpass' : 'active');
      
        sdp += 'a=mid:' + transceiver.mid + '\r\n';
      
        if (transceiver.direction) {
          sdp += 'a=' + transceiver.direction + '\r\n';
        } else if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += 'a=sendrecv\r\n';
        } else if (transceiver.rtpSender) {
          sdp += 'a=sendonly\r\n';
        } else if (transceiver.rtpReceiver) {
          sdp += 'a=recvonly\r\n';
        } else {
          sdp += 'a=inactive\r\n';
        }
      
        if (transceiver.rtpSender) {
          // spec.
          var msid = 'msid:' + stream.id + ' ' +
              transceiver.rtpSender.track.id + '\r\n';
          sdp += 'a=' + msid;
      
          // for Chrome.
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
              ' ' + msid;
          if (transceiver.sendEncodingParameters[0].rtx) {
            sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
                ' ' + msid;
            sdp += 'a=ssrc-group:FID ' +
                transceiver.sendEncodingParameters[0].ssrc + ' ' +
                transceiver.sendEncodingParameters[0].rtx.ssrc +
                '\r\n';
          }
        }
        // FIXME: this should be written by writeRtpDescription.
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc +
            ' cname:' + SDPUtils.localCName + '\r\n';
        if (transceiver.rtpSender && transceiver.sendEncodingParameters[0].rtx) {
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].rtx.ssrc +
              ' cname:' + SDPUtils.localCName + '\r\n';
        }
        return sdp;
      };
      
      // Gets the direction from the mediaSection or the sessionpart.
      SDPUtils.getDirection = function(mediaSection, sessionpart) {
        // Look for sendrecv, sendonly, recvonly, inactive, default to sendrecv.
        var lines = SDPUtils.splitLines(mediaSection);
        for (var i = 0; i < lines.length; i++) {
          switch (lines[i]) {
            case 'a=sendrecv':
            case 'a=sendonly':
            case 'a=recvonly':
            case 'a=inactive':
              return lines[i].substr(2);
            default:
              // FIXME: What should happen here?
          }
        }
        if (sessionpart) {
          return SDPUtils.getDirection(sessionpart);
        }
        return 'sendrecv';
      };
      
      SDPUtils.getKind = function(mediaSection) {
        var lines = SDPUtils.splitLines(mediaSection);
        var mline = lines[0].split(' ');
        return mline[0].substr(2);
      };
      
      SDPUtils.isRejected = function(mediaSection) {
        return mediaSection.split(' ', 2)[1] === '0';
      };
      
      SDPUtils.parseMLine = function(mediaSection) {
        var lines = SDPUtils.splitLines(mediaSection);
        var parts = lines[0].substr(2).split(' ');
        return {
          kind: parts[0],
          port: parseInt(parts[1], 10),
          protocol: parts[2],
          fmt: parts.slice(3).join(' ')
        };
      };
      
      SDPUtils.parseOLine = function(mediaSection) {
        var line = SDPUtils.matchPrefix(mediaSection, 'o=')[0];
        var parts = line.substr(2).split(' ');
        return {
          username: parts[0],
          sessionId: parts[1],
          sessionVersion: parseInt(parts[2], 10),
          netType: parts[3],
          addressType: parts[4],
          address: parts[5]
        };
      };
      
      // a very naive interpretation of a valid SDP.
      SDPUtils.isValidSDP = function(blob) {
        if (typeof blob !== 'string' || blob.length === 0) {
          return false;
        }
        var lines = SDPUtils.splitLines(blob);
        for (var i = 0; i < lines.length; i++) {
          if (lines[i].length < 2 || lines[i].charAt(1) !== '=') {
            return false;
          }
          // TODO: check the modifier a bit more.
        }
        return true;
      };
      
      // Expose public methods.
      if (typeof module === 'object') {
        module.exports = SDPUtils;
      }
      
      },{}]},{},[1])(1)
      });

  }]},{},[41]);
 
	