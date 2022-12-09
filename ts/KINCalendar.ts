// ----------------------------------------------------------------------------------------------------
// 定数/変数宣言
// ----------------------------------------------------------------------------------------------------

const $pageHeader = document.getElementById("pageHeader") as HTMLDivElement;
const $pageHeaderChild = document.getElementById("pageHeaderChild") as HTMLDivElement;
const $resultFormHeader = document.getElementById("resultFormHeader") as HTMLDivElement;
const $resultFormHeaderChild = document.getElementById("resultFormHeaderChild") as HTMLDivElement;
const $initForm = document.getElementById("initForm") as HTMLInputElement;
const $calendarInitForm = document.getElementById("calendarInitForm") as HTMLInputElement;
const $calendarInc = document.getElementById("calendarInc") as HTMLButtonElement;
const $calendarDec = document.getElementById("calendarDec") as HTMLButtonElement;
const $calendarRst = document.getElementById("calendarRst") as HTMLButtonElement;
const $inputKINCycleRange = document.getElementById("inputKINCycleRange") as HTMLInputElement;
const $initTableDisplay = document.getElementById("initTableDisplay") as HTMLDivElement;
const $calcResult = document.getElementById("calcResult") as HTMLHeadElement;
const $inputValueForm = document.getElementById("inputValueForm") as HTMLDivElement;
const $birthdayForm = document.getElementById("birthdayForm") as HTMLElement;
const $kinBirthday = document.getElementById("kinBirthday") as HTMLElement;
const $compareKIN = document.getElementById("compareKIN") as HTMLElement;
const $otherCalendar = document.getElementById("otherCalendar") as HTMLElement;
const $storyKIN = document.getElementById("storyKIN") as HTMLElement;
const $personalKIN = document.getElementById("personalKIN") as HTMLElement;
const $kinCycle = document.getElementById("kinCycle") as HTMLElement;
const $resultForm = document.getElementById("resultForm") as HTMLDivElement;

const $setupForms = document.getElementsByName("setupForms") as NodeListOf<HTMLFormElement>;
const $formLabels = document.getElementsByName("formLabel") as NodeListOf<HTMLHeadElement>;
const $tableShowBottons = document.getElementsByName("tableShowBottons") as NodeListOf<HTMLInputElement>;
const $calendarSetupButtons = document.getElementsByName("calendarSetupButtons") as NodeListOf<HTMLButtonElement>;
const $setTablesHeight = document.getElementsByName("setTablesHeight") as NodeListOf<HTMLInputElement>;
const $inputNames = document.getElementsByName("inputNames") as NodeListOf<HTMLInputElement>;
const $inputBirths = document.getElementsByName("inputBirths") as NodeListOf<HTMLInputElement>;
const $calcBtns = document.getElementsByName("calcBtns") as NodeListOf<HTMLButtonElement>;

const CALENDAR_MAX = 8;
const CALENDAR_DEFAULT = 2;
const SHIFT_AGE = 30;
const CALC_DATE_DIFF = 86400000;
const KIN_START = -3113
const BC_KIN_DATE = 1136245; // うるう年抜き
const AD_KIN_OFFSET = 730000; // うるう年抜き
const BC_DATE = 1136998;
const AD_OFFSET = 730485;
const KINLIST = ["赤い龍", "白い風", "青い夜", "黄色い種",
                "赤い蛇", "白い世界の橋渡し", "青い手", "黄色い星",
                "赤い月", "白い犬", "青い猿", "黄色い人",
                "赤い空歩く人", "白い魔法使い", "青い鷲", "黄色い戦士",
                "赤い地球", "白い鏡", "青い嵐", "黄色い太陽"];
const BLACK_KIN_NUM = [1, 20, 22, 39, 43, 50, 51, 58, 64, 69, 72, 77, 85, 88, 93, 96, 106, 107, 108,
                    109, 110, 111, 112, 113, 114, 115, 146, 147, 148, 149, 150, 151, 152, 153, 154,
                    155, 165, 168, 173, 176, 184, 189, 192, 197, 203, 210, 211, 218, 222, 239, 241, 260];
const HAAB_LIST = ["pop", "uo", "zip", "sots", "tzek", "xul", "yaxkin", "mol", "chen", "yax",
                    "zac", "ceh", "mac", "kankin", "muan", "pax", "keyab", "kumku", "wayeb"];
const PERMIT_NAME_KEY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Tab",
                        "Hankaku", "Zenkaku", "ArrowLeft", "ArrowRight", "Shift",
                        "Backspace", "Delete", "Home", "End", "F6", "F7", "F8", " ",
                        "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
                        "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
const PERMIT_BIRTH_KEY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "-", "Tab", "Home", "End",
                        "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Backspace", "Delete"];
const NUM_KEY = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const IGNORE_ENABLE_KEY = ["Tab", "Home", "End", "ArrowLeft", "ArrowRight"]
const LIMIT_STR = ["<", ">", ",", ".", "/", "\\", "?", "=", "*", "+", "\"", "\'", "\`", "{", "}", "[", "]", "&", "%", "$", "|"];
// 危険な文字は置換 & → &amp; < → &lt; > → &gt; " → &quot; ' → &#39;

let calendarCount = CALENDAR_DEFAULT;
let today = new Date();
let person: PersonalData[] = Array(CALENDAR_MAX + 1);
let calendar: Calendar;

class PersonalData {
    name: string;
    year: number;
    month: number;
    day: number;
    constructor(name: string, year: number, month: number, day: number){
        this.name = name;
        this.year = year;
        this.month = month;
        this.day = day;
    }

    getName() {
        return this.name;
    }
    getYear(){
        return this.year;
    }
    getMonth(){
        return this.month;
    }
    getDay(){
        return this.day;
    }
    getBirthday(){
        return {"year": this.year, "month": this.month, "day": this.day};
    }
    getPersonalData(){
        return {"name": this.name, "year": this.year, "month": this.month, "day": this.day};
    }

    setName(name: string){
        this.name = name;
    }
    setYear(year: number){
        this.year = year;
    }
    setMonth(month: number){
        this.month = month;
    }
    setDay(day: number){
        this.day = day;
    }
    setBirthday(ymdData: {[key: string]: number}){
        this.year = ymdData["year"];
        this.month = ymdData["month"];
        this.day = ymdData["day"];
    }
    setPersonalData(name: string, ymdData: {[key: string]: number}){
        this.name = name;
        this.year = Number(ymdData["year"]);
        this.month = Number(ymdData["month"]);
        this.day = Number(ymdData["day"]);
    }
}
class CalendarStatus {
    isHidden: boolean;
    onePercentHeight: number;
    heightPercent: number;
    constructor(
        isHidden: boolean,
        onePercentHeight: number,
        heightPercent: number,
    ){
        this.isHidden = isHidden;
        this.onePercentHeight = onePercentHeight;
        this.heightPercent = heightPercent;
    }

    setHeight(elementId: string, percent: number){
        const $tbodyElements = document.getElementsByClassName(`set-${elementId}Height`) as HTMLCollectionOf<HTMLTableElement>;
        for(const $tbodyElement of $tbodyElements){
            $tbodyElement.style.setProperty(`--pc-${elementId}`, String(percent));
        }
        this.heightPercent = percent;
    }
    setOrgHeight(elementId: string){
        const $tableElements = document.getElementsByClassName(`set-${elementId}Height`) as HTMLCollectionOf<HTMLTableElement>;
        let fullHeight = $tableElements[0].clientHeight;
        for(const $tableElement of $tableElements){
            $tableElement.style.setProperty(`--onePc-${elementId}`, `${fullHeight * 0.01}px`);
        }
        this.onePercentHeight = fullHeight * 0.01;
    }
    setHidden(hidden: boolean){
        this.isHidden = hidden;
    }

    getHeightParam(){
        return {"onePcHeight": this.onePercentHeight, "percent": this.heightPercent};
    }
    getHeight(){
        return this.onePercentHeight * this.heightPercent;
    }
    getHidden(){
        return this.isHidden;
    }
}
class CalendarInfo {
    kinBirthday: string[][];
    compareKIN: string[][];
    otherCalendar: string[][];
    storyKIN: string[][];
    personalKIN: string[][];
    kinCycle: string[][];
    constructor(allCalendarData: {[key: string]: string[][]}){
        this.kinBirthday = allCalendarData["kinBirthday"];
        this.compareKIN = allCalendarData["compareKIN"];
        this.otherCalendar = allCalendarData["otherCalendar"];
        this.storyKIN = allCalendarData["storyKIN"];
        this.personalKIN = allCalendarData["personalKIN"];
        this.kinCycle = allCalendarData["kinCycle"];
    }
    
    setAll(allCalendarData: {[key: string]: string[][]}){
        this.kinBirthday = allCalendarData["kinBirthday"];
        this.compareKIN = allCalendarData["compareKIN"];
        this.otherCalendar = allCalendarData["otherCalendar"];
        this.storyKIN = allCalendarData["storyKIN"];
        this.personalKIN = allCalendarData["personalKIN"];
        this.kinCycle = allCalendarData["kinCycle"];
    }

    getKINBirthday(){
        return this.kinBirthday;
    }
    getCompareKIN(){
        return this.compareKIN;
    }
    getOtherCalendar(){
        return this.otherCalendar;
    }
    getStoryKIN(){
        return this.storyKIN;
    }
    getPersonalKIN(){
        return this.personalKIN;
    }
    getKINCycle(){
        return this.kinCycle;
    }
    getAll(){
        let allData: {[key: string]: string[][]};
        allData = {
            "kinBirthday": this.kinBirthday,
            "compareKIN": this.compareKIN,
            "otherCalendar": this.otherCalendar,
            "storyKIN": this.storyKIN,
            "personalKIN": this.personalKIN,
            "kinCycle": this.kinCycle,
        };
        return allData;
    }
}
class Calendar {
    status: {[key: string]: CalendarStatus} = {};
    info: CalendarInfo[] = Array(CALENDAR_MAX + 1);
    constructor(orgPersonalData: PersonalData){
        // 変数宣言
        let orgYear = orgPersonalData.getYear();
        let orgMonth = orgPersonalData.getMonth();
        let orgDay = orgPersonalData.getDay();
        let allCalendarData = Get_allCalendarData(orgYear, orgMonth, orgDay, Number($inputKINCycleRange.value));
        // 計算
        for(let i = 1; i < $resultForm.children.length; i++){
            let _idStr = $resultForm.children[i].id;
            this.status[_idStr] = new CalendarStatus(false, 0, 0);
            for(let j = 1; j <= CALENDAR_MAX; j++){
                const $_tbodyElement = document.getElementById(`${_idStr}Table${j}`) as HTMLDivElement;
                $_tbodyElement.classList.add(`set-${_idStr}Height`);
            }
        }
        for(let i = 0; i <= CALENDAR_MAX; i++){
            this.info[i] = new CalendarInfo(allCalendarData);
        }
    }

    resetCalendar(){
        for(let i = 1; i <= CALENDAR_MAX; i++){
            this.info[i].setAll(this.info[0].getAll());
        }
    }
    hideAllCalendar(){
        for(let i = 1; i < $resultForm.children.length; i++){
            const $resultCalendarElement = $resultForm.children[i] as HTMLElement;
            $resultCalendarElement.hidden = true;
        }
    }
    showCalendar(){
        for(let i = 1; i < $resultForm.children.length; i++){
            const $resultCalendarElement = $resultForm.children[i] as HTMLElement;
            $resultCalendarElement.hidden = this.status[$resultForm.children[i].id].getHidden();
        }
    }
}

// ----------------------------------------------------------------------------------------------------
// 初期化
// ----------------------------------------------------------------------------------------------------

// ページがロードされたとき
window.addEventListener("load", InitPage);
// 初期化
function InitPage(){
    InitData();
    InitReject();
    InitStyle();
}
// データの初期化
function InitData(){
    // 変数宣言
    let orgYear = today.getFullYear() - SHIFT_AGE;
    let orgMonth = today.getMonth() + 1;
    let maxDay = monthRange(orgYear, orgMonth);
    let orgDay: number;
    if(today.getDate() > maxDay){
        orgDay = maxDay;
    } else {
        orgDay = today.getDate();
    }
    person[0] = new PersonalData("カレンダー0", orgYear, orgMonth, orgDay);
    calendar = new Calendar(person[0]);
    for(const $setupForm of $setupForms){
        $setupForm.reset();
    }
    for(let i = 1; i <= CALENDAR_MAX; i++){
        person[i] = new PersonalData(`カレンダー${i}`, orgYear, orgMonth, orgDay);
        calendar.info[i].setAll(Get_allCalendarData(person[i].getYear(), person[i].getMonth(), person[i].getDay(), Number($inputKINCycleRange.value)));
        setInputValue(`カレンダー${i}`, person[i].getYear(), person[i].getMonth(), person[i].getDay(), maxDay, i);
        ChangeCalendarInfo(i);
    }
}
// 入力欄の機能制限
function InitReject(){
    $inputValueForm.addEventListener("paste", (event) => { // ペースト禁止
        event.preventDefault();
    });
    $inputValueForm.addEventListener("contextmenu", (event) => { // 右クリック禁止
        event.preventDefault();
    });
    $inputValueForm.addEventListener("drop", (event) => { // ドロップ禁止
        event.preventDefault();
    });
}
// ページの表示を初期化
function InitStyle(){
    InitPageWidth();
    InitTableHeight();
}
// 危険な文字の置換
function Sanitizing(str: string){
    return str.replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}
// ページ幅を初期化
function InitPageWidth(){
    $initForm.style.width = String(document.body.clientWidth * 0.7) + "px";
    $pageHeaderChild.style.width = String(document.body.clientWidth * 0.7) + "px";
    for(const $formLabel of $formLabels){
        $formLabel.style.width = String(document.body.clientWidth * 0.9) + "px";
    }
    ChangeTableWidth();
}
// ページ高さを初期化
function InitTableHeight(){
    const $pageOffset = document.getElementById("pageOffset") as HTMLDivElement;
    $pageOffset.style.height = String($pageHeader.clientHeight) + "px";
    if($kinBirthday.getBoundingClientRect().top <= $resultFormHeader.clientHeight){
        $resultFormHeader.style.top = String($pageHeader.clientHeight) + "px";
    } else {
        $resultFormHeader.style.top = String($pageHeader.clientHeight - $resultFormHeader.clientHeight - 2) + "px";
    }
    for(let i = 1; i < $resultForm.children.length; i++){
        const $sectionElement = $resultForm.children[i] as HTMLElement;
        let tableId = $sectionElement.id;
        calendar.status[tableId].setOrgHeight(tableId);
        if(i >= 3){
            const $heightPcElement = document.getElementById(`pc-${tableId}`) as HTMLInputElement;
            $heightPcElement.form!.reset()
            calendar.status[tableId].setHeight(tableId, Number($heightPcElement.value));
        }
    }
}

// ----------------------------------------------------------------------------------------------------
// 全体の動作
// ----------------------------------------------------------------------------------------------------

// 入力した年、月の長さを取得する
function monthRange(year: number, month: number){
    if(year > 0){
        return new Date(year + 2000, month, 0).getDate();
    } else {
        return new Date(year, month, 0).getDate();
    }
}
// 入力欄の値を設定
function setInputValue(name: string = "", year: number = 0, month: number = 0, day: number = 0, maxDay: number = 0, index: number){
    if(name != ""){
        const $inputNameElement = document.getElementById(`inputName${index}`) as HTMLInputElement;
        $inputNameElement.value = name;
    }
    if(year > 0){
        const $inputYearElement = document.getElementById(`inputYear${index}`) as HTMLInputElement;
        $inputYearElement.value = String(year);
    }
    if(month > 0){
        const $inputMonthElement = document.getElementById(`inputMonth${index}`) as HTMLInputElement;
        $inputMonthElement.value = String(month);
    }
    if(day > 0){
        const $inputDayElement = document.getElementById(`inputDay${index}`) as HTMLInputElement;
        $inputDayElement.value = String(day);
    }
    if(maxDay > 0){
        const $inputDayElement = document.getElementById(`inputDay${index}`) as HTMLInputElement;
        $inputDayElement.max = String(maxDay);
    }
}
// 入力欄の値を取得
function getInputValue(index: number){
    const $inputNameElement = document.getElementById(`inputName${index}`) as HTMLInputElement;
    const $inputYearElement = document.getElementById(`inputYear${index}`) as HTMLInputElement;
    const $inputMonthElement = document.getElementById(`inputMonth${index}`) as HTMLInputElement;
    const $inputDayElement = document.getElementById(`inputDay${index}`) as HTMLInputElement;
    let name = $inputNameElement.value;
    let year = Number($inputYearElement.value);
    let month = Number($inputMonthElement.value);
    let day = Number($inputDayElement.value);
    return {"name": name, "year": year, "month": month, "day": day};
}
// ページ幅を調整
function ChangeTableWidth(){
    let formWidth = String(document.body.clientWidth * (0.58 + calendarCount * 0.05)) + "px";
    $inputValueForm.style.width = formWidth;
    $resultForm.style.width = formWidth;
    $resultFormHeaderChild.style.width = formWidth;
}

// ウィンドウの大きさが変更されたとき
window.addEventListener("resize", () => {
    InitPageWidth();
});

// ページがスクロールされたとき
window.addEventListener("scroll", () => {
    if($kinBirthday.getBoundingClientRect().top <= $pageHeader.clientHeight + $resultFormHeader.clientHeight){
        $resultFormHeader.style.top = String($pageHeader.clientHeight) + "px";
    } else {
        $resultFormHeader.style.top = String($pageHeader.clientHeight - $resultFormHeader.clientHeight - 2) + "px";
    }
});
// 特定の位置までページをスクロールする
function PageScroll(eventId: string, eventName: string){
    const $eventElement = document.getElementById(eventId) as HTMLButtonElement;
    if($eventElement != null){
        let elementPos = window.scrollY + $eventElement.getBoundingClientRect().top;
        if(eventName == "init"){
            document.documentElement.scrollTop = elementPos - $pageHeader.clientHeight - 1;
        } else if(eventName == "calc"){
            document.documentElement.scrollTop = elementPos - $pageHeader.clientHeight - $resultFormHeader.clientHeight;
        }
    }
}

// 隠しフォームのボタンが押されたとき
function NavBarButtonClicked(event: Event){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLButtonElement)){
        return;
    }
    let eventId = String(currentTarget.id).substring(5);
    PageScroll(eventId, currentTarget.name);
}
for(let i = 0; i < $pageHeaderChild.children.length; i++){
    $pageHeaderChild.children[i].addEventListener("click", NavBarButtonClicked);
}

// ----------------------------------------------------------------------------------------------------
// ページ設定
// ----------------------------------------------------------------------------------------------------

// カレンダーが計算済か調べる
function CalcDoneCheck(){
    let enableCalc = true;
    for(let i = 1; i <= calendarCount; i++){
        const $calcBtnElement = document.getElementById(`calcBtn${i}`) as HTMLButtonElement;
        if($calcBtnElement.disabled == false){
            enableCalc = false;
            break;
        }
    }
    return enableCalc;
}

// [カレンダーを増やす]が押されたとき
function CalendarAdd(){
    // 変数宣言
    calendarCount++;
    person[calendarCount].setPersonalData(`カレンダー${calendarCount}`, person[calendarCount - 1].getBirthday());
    const $calcBtnElement = document.getElementById(`calcBtn${calendarCount}`) as HTMLButtonElement;
    let maxDay = monthRange(person[calendarCount].getYear(), person[calendarCount].getMonth());
    // 1つ手前のカレンダーと同じものを追加
    setInputValue(`カレンダー${calendarCount}`, person[calendarCount].getYear(), person[calendarCount].getMonth(), person[calendarCount].getDay(), maxDay, calendarCount);
    if(calendarCount == CALENDAR_MAX){
        $calendarInc.disabled = true;
    } else if(calendarCount == 2){
        $calendarDec.disabled = false;
    }
    PageHidden(calendarCount, false);
    $calcBtnElement.disabled = true;
    $calcBtnElement.innerText = "計算済";
    ChangeCalendarInfo(calendarCount);
    ChangeTableWidth();
}
// [カレンダーを減らす]が押されたとき
function CalendarRemove(){
    // 最後尾を非表示/初期化
    PageHidden(calendarCount, true);
    DeleteTable(calendarCount);
    calendarCount--;
    if(calendarCount == 1){
        $calendarDec.disabled = true;
    } else if(calendarCount == CALENDAR_MAX - 1){
        $calendarInc.disabled = false;
    }
    ChangeTableWidth();
}
// カレンダーのリセット
function CalendarReset(){
    // 変数宣言
    calendarCount = CALENDAR_DEFAULT;
    // カレンダーの初期化
    $calendarInc.disabled = false;
    $calendarDec.disabled = false;
    calendar.resetCalendar();
    let maxDay = monthRange(person[0].getYear(), person[0].getMonth());
    for(let i = 1; i <= CALENDAR_MAX; i++){
        const $calcBtnElement = document.getElementById(`calcBtn${i}`) as HTMLButtonElement;
        // 計算結果の初期化
        person[i].setPersonalData(`カレンダー${i}`, person[0].getBirthday());
        setInputValue(`カレンダー${i}`, person[i].getYear(), person[i].getMonth(), person[i].getDay(), maxDay, i);
        // 表示数の初期値以前
        if(i <= CALENDAR_DEFAULT){
            // 表示範囲を初期化
            PageHidden(i, false);
            $calcBtnElement.disabled = true;
            $calcBtnElement.innerText = "計算済";
            ChangeCalendarInfo(i);
        //表示数の初期値より後
        } else {
            // 非表示範囲を初期化
            PageHidden(i, true);
            DeleteTable(i);
        }
    }
    // 画面幅の調整
    ChangeTableWidth();
}
// ページ設定のボタン類が押されたとき
function calendarSetupButtonClicked(event: MouseEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLButtonElement)){
        return;
    }
    // [カレンダーを増やす]が押されたとき
    if(currentTarget.id == $calendarInc.id){
        if(calendarCount < CALENDAR_MAX){
            CalendarAdd();
        }
    // [カレンダーを減らす]が押されたとき
    } else if(currentTarget.id == $calendarDec.id){
        if(calendarCount > 1){
            CalendarRemove();
        }
    // [リセット]が押されたとき
    } else if(currentTarget.id == $calendarRst.id){
        CalendarReset();
    }
}
for(const $calendarSetupButton of $calendarSetupButtons){
    $calendarSetupButton.addEventListener("click", calendarSetupButtonClicked);
}

// 計算結果の表示設定のボタンが押されたとき
function TableShowButtonClicked(event: MouseEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLButtonElement)){
        return;
    }
    // 変数宣言
    let orgId = String(currentTarget.id).slice(7);
    const $pcElement = document.getElementById(`pc-${orgId}`) as HTMLInputElement;
    const $jumpElement = document.getElementById(`jump-${orgId}`) as HTMLButtonElement;
    const $orgIdElement = document.getElementById(orgId) as HTMLHeadElement;
    // 設定
    if(currentTarget.innerText == "表示中"){
        currentTarget.classList.remove("btn-outline-secondary");
        currentTarget.classList.add("btn-secondary");
        currentTarget.innerText = "表示する";
        $pcElement.disabled = true;
        $jumpElement.hidden = true;
        $orgIdElement.hidden = true;
        if(currentTarget.id == "enable-kinCycle"){
            $inputKINCycleRange.disabled = true;
        }
    } else {
        currentTarget.classList.remove("btn-secondary");
        currentTarget.classList.add("btn-outline-secondary");
        currentTarget.innerText = "表示中";
        $pcElement.disabled = false;
        $jumpElement.hidden = false;
        $orgIdElement.hidden = false;
        if(currentTarget.id == "enable-kinCycle"){
            $inputKINCycleRange.disabled = false;
        }
        for(let i = 1; i <= calendarCount; i++){
            let inputValue = getInputValue(i);
            let year = inputValue.year;
            let month = inputValue.month;
            let day = inputValue.day;
            if(currentTarget.id == "enable-otherCalendar"){
                Show_otherCalendar(year, month, day, i);
            } else if(currentTarget.id == "enable-storyKIN"){
                Show_storyKIN(year, month, day, i);
            } else if(currentTarget.id == "enable-personalKIN"){
                Show_personalKIN(year, month, day, i);
            } else if(currentTarget.id == "enable-kinCycle"){
                Show_kinCycle(year, month, day, i);
            }
        }
    }
    GetCalendarHidden();
}
for(const $tableShowBotton of $tableShowBottons){
    $tableShowBotton.addEventListener("click", TableShowButtonClicked);
}

// KIN周期表入力欄の設定
// キーの押下時
function kinCycleRangeSetupKeydown(event: KeyboardEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    if(PERMIT_BIRTH_KEY.includes(event.key) == true && event.key != "-"){
        if(NUM_KEY.includes(event.key) == true){
            if(currentTarget.value.length > 2){
                event.preventDefault();
            } else if(currentTarget.value.length == 2 && !(currentTarget.value == "10" && event.key == "0")){
                event.preventDefault();
            }
        } else if(currentTarget.value.length > 2 && event.key == "ArrowUp"){
            event.preventDefault();
        } else if(Number(currentTarget.value) <= 1 && event.key == "ArrowDown"){
            event.preventDefault();
        }
    } else {
        event.preventDefault();
    }
}
// 変更時
function kinCycleRangeSetupChange(event: Event){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    let orgNumBuff = String(currentTarget.value);
    let editedStr = orgNumBuff.split("");
    for(let i = 0; i < editedStr.length; i++){
        if(!NUM_KEY.includes(editedStr[i])){
            orgNumBuff = orgNumBuff.replace(editedStr[i], "");
        }
    }
    let orgNum = Number(orgNumBuff);
    if(orgNum > 100){
        orgNum = 100;
    } else if(orgNum < 1){
        orgNum = 1;
    }
    currentTarget.value = String(orgNum);
    for(let i = 1; i <= calendarCount; i++){
        const $kinCycleCalc = document.getElementById(`kinCycleCalc${i}`) as HTMLTableSectionElement;
        let inputValue = getInputValue(i);
        let kinCycle: string[][] = [];
        while($kinCycleCalc.firstChild){
            $kinCycleCalc.removeChild($kinCycleCalc.firstChild);
        }
        kinCycle = CalcKINCycle(inputValue.year, inputValue.month, inputValue.day, orgNum);
        GenerateTable(kinCycle, $kinCycleCalc)
    }
}
$inputKINCycleRange.addEventListener("keydown", kinCycleRangeSetupKeydown);
$inputKINCycleRange.addEventListener("change", kinCycleRangeSetupChange);

// テーブル高さ入力欄の設定
// キーの押下時
function TableHeightSatupKeydown(event: KeyboardEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    if(PERMIT_BIRTH_KEY.includes(event.key) == true && event.key != "-"){
        if(NUM_KEY.includes(event.key) == true){
            if(currentTarget.value.length > 2){
                event.preventDefault();
            } else if(currentTarget.value.length == 2 && !(currentTarget.value == "10" && event.key == "0")){
                event.preventDefault();
            }
        } else if(currentTarget.value.length > 2 && event.key == "ArrowUp"){
            event.preventDefault();
        } else if(Number(currentTarget.value) <= 1 && event.key == "ArrowDown"){
            event.preventDefault();
        }
    } else {
        event.preventDefault();
    }
}
// 変更時
function TableHeightSatupChange(event: Event){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    let orgNumBuff = String(currentTarget.value);
    let editedStr = orgNumBuff.split("");
    let orgId = String(currentTarget.id).slice(3);
    for(let i = 0; i < editedStr.length; i++){
        if(!NUM_KEY.includes(editedStr[i])){
            orgNumBuff = orgNumBuff.replace(editedStr[i], "");
        }
    }
    let orgNum = Number(orgNumBuff);
    if(orgNum > 100){
        orgNum = 100;
    } else if(orgNum < 1){
        orgNum = 1;
    }
    currentTarget.value = String(orgNum);
    calendar.status[orgId].setHeight(orgId, orgNum);
}
for(const $setTableHeight of $setTablesHeight){
    $setTableHeight.addEventListener("keydown", TableHeightSatupKeydown);
    $setTableHeight.addEventListener("change", TableHeightSatupChange);
}

// ----------------------------------------------------------------------------------------------------
// 生年月日入力
// ----------------------------------------------------------------------------------------------------

// カレンダーの名前の変更
function ChangeCalendarName(index: number){
    const $birthdayNameElement = document.getElementById(`birthdayName${index}`) as HTMLHeadElement;
    const $birthdayNameHeaderElement = document.getElementById(`birthdayName${index}Header`) as HTMLHeadElement;
    $birthdayNameElement.innerText = person[index].getName();
    $birthdayNameHeaderElement.innerText = person[index].getName();
}
// カレンダーの日付の変更
function ChangeBirthday(index: number){
    let changePerson = person[index];
    let ageNum = today.getFullYear() - changePerson.getYear();
    const $resultBirthdayElement = document.getElementById(`resultBirthday${index}`) as HTMLHeadElement;
    const $resultBirthdayHeaderElement = document.getElementById(`resultBirthday${index}Header`) as HTMLHeadElement;
    const $resultAgeElement = document.getElementById(`resultAge${index}`) as HTMLHeadElement;
    const $resultAgeHeaderElement = document.getElementById(`resultAge${index}Header`) as HTMLHeadElement;
    $resultBirthdayElement.innerText = `${changePerson.getYear()}年${changePerson.getMonth()}月${changePerson.getDay()}日`;
    $resultBirthdayHeaderElement.innerText = `${changePerson.getYear()}年${changePerson.getMonth()}月${changePerson.getDay()}日`;
    if(today.getMonth() + 1 < changePerson.getMonth()){
        ageNum--;
    } else if(today.getMonth() + 1 == changePerson.getMonth() && today.getDate() < changePerson.getDay()){
        ageNum--;
    }
    $resultAgeElement.innerText = `${ageNum}歳`;
    $resultAgeHeaderElement.innerText = `${ageNum}歳`;
}
// カレンダーの変更
function ChangeCalendarInfo(index: number){
    ChangeCalendarName(index);
    ChangeBirthday(index);
    ShowKINTable(person[index].getYear(), person[index].getMonth(), person[index].getDay(), index);
}

// 名前入力欄の設定
// キーの押下時
function SanitizingNameKeydown(event: KeyboardEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    if(PERMIT_NAME_KEY.includes(event.key) == false){
        event.preventDefault();
    }
}
// 変更時
function SanitizingNameChange(event: Event){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    let orgText = currentTarget.value;
    let editedStr = orgText.split("");
    let elementNum = String(currentTarget.id).slice(-1); // 変更された欄のidの最後の一文字がカレンダーのインデックスを表す
    for(let i = 0; i < editedStr.length; i++){
        if(LIMIT_STR.includes(editedStr[i])){
            orgText = orgText.replace(editedStr[i], "");
        }
    }
    if(orgText == ""){
        orgText = `カレンダー${elementNum}`;
    }
    currentTarget.value = orgText;
    person[Number(elementNum)].setName(orgText);
    ChangeCalendarName(Number(elementNum));
}
for(const $inputName of $inputNames){
    $inputName.addEventListener("keydown", SanitizingNameKeydown);
    $inputName.addEventListener("change", SanitizingNameChange);
}

// 誕生日入力欄の設定
// キーの押下時
function SanitizingBirthdayKeydown(event: KeyboardEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    // 変数宣言
    let elementNum = Number(String(currentTarget.id).slice(-1)); // 変更された欄のidの最後の一文字がカレンダーのインデックスを表す
    const $inputYearElement = document.getElementById(`inputYear${elementNum}`) as HTMLInputElement;
    const $inputMonthElement = document.getElementById(`inputMonth${elementNum}`) as HTMLInputElement;
    const $inputDayElement = document.getElementById(`inputDay${elementNum}`) as HTMLInputElement;
    let inputYear = Number($inputYearElement.value);
    let inputMonth = Number($inputMonthElement.value);
    let inputDay = Number($inputDayElement.value);
    let maxDay: number;
    let eventValue = Number(currentTarget.value);
    let eventKey = Number(event.key);
    // 制限とか制御
    if(PERMIT_BIRTH_KEY.includes(event.key) == false){
        event.preventDefault();
        return;
    } else if(currentTarget.value == "" && event.key == "0"){
        event.preventDefault();
        return;
    // 特殊な動作の場合
    // 年
    } else if(currentTarget.id == `inputYear${elementNum}`){
        if(event.key == "ArrowDown"){
            if(eventValue == -3113){
                currentTarget.value = "-3113";
                event.preventDefault();
            } else if(eventValue == 1){
                currentTarget.value = "-1";
                person[elementNum].setYear(-1);
                event.preventDefault();
            }
        } else if(event.key == "ArrowUp"){
            if(eventValue == 9999){
                currentTarget.value = "9999";
                event.preventDefault();
            } else if(eventValue == -1){
                currentTarget.value = "1";
                person[elementNum].setYear(1);
                event.preventDefault();
            }
        } else if(event.key == "-"){
            if(currentTarget.value != ""){
                if(String(currentTarget.value).includes("-")){
                    currentTarget.value = String(currentTarget.value).replace("-", "");
                } else {
                    currentTarget.value = String(currentTarget.value).replace("-", "");
                    eventValue = Number(currentTarget.value) * -1;
                    if(eventValue < -3113){
                        currentTarget.value = "-3113";
                        person[elementNum].setYear(-3113);
                    } else {
                        currentTarget.value = String(eventValue);
                        person[elementNum].setYear(eventValue);
                    }
                }
                event.preventDefault();
            }
        } else if(NUM_KEY.includes(event.key)){
            if(eventValue >= 1000 || eventValue <= -1000){
                event.preventDefault();
            }
        }
    // 月
    } else if(currentTarget.id == `inputMonth${elementNum}`){
        if(event.key == "ArrowDown"){
            if(eventValue <= 1 && inputYear > -3113){
                currentTarget.value = "12";
                inputYear--;
                $inputYearElement.value = String(inputYear);
                person[elementNum].setYear(inputYear);
                person[elementNum].setMonth(12);
                event.preventDefault();
            } else {
                maxDay = monthRange(inputYear, inputMonth - 1);
                $inputDayElement.max = String(maxDay);
                if(inputDay > maxDay){
                    inputDay = maxDay;
                    $inputDayElement.value = String(inputDay);
                }
            }
        } else if(event.key == "ArrowUp"){
            if(eventValue >= 12 && inputYear < 9999){
                currentTarget.value = "1";
                inputYear++;
                $inputYearElement.value = String(inputYear);
                person[elementNum].setYear(inputYear);
                person[elementNum].setMonth(1);
                event.preventDefault();
            } else {
                maxDay = monthRange(inputYear, inputMonth + 1);
                $inputDayElement.max = String(maxDay);
                if(inputDay > maxDay){
                    inputDay = maxDay;
                    $inputDayElement.value = String(inputDay);
                    person[elementNum].setDay(inputDay);
                }
            }
        } else if(event.key == "-"){
            event.preventDefault();
        } else if(NUM_KEY.includes(event.key)){
            if(eventValue == 1){
                if(eventKey >= 3){
                    event.preventDefault();
                }
            } else if(currentTarget.value.length >= 1){
                event.preventDefault();
            }
        }
    // 日
    } else if(currentTarget.id == `inputDay${elementNum}`){
        maxDay = monthRange(inputYear, inputMonth);
        if(event.key == "ArrowDown"){
            if(eventValue == 1){
                if(inputMonth == 1 && inputYear == -3113){
                    event.preventDefault();
                } else {
                    if(inputMonth == 1){
                        if(inputYear == 1){
                            inputYear = -1;
                        } else {
                            inputYear--;
                        }
                        inputMonth = 12;
                        $inputYearElement.value = String(inputYear);
                        currentTarget.value = "31";
                        person[elementNum].setBirthday({"year": inputYear, "month": 12, "day": 31});
                    } else {
                        inputMonth--;
                        maxDay = monthRange(inputYear, inputMonth);
                        $inputDayElement.max = String(maxDay);
                        currentTarget.value = String(maxDay);
                        person[elementNum].setBirthday({"year": inputYear, "month": inputMonth, "day": maxDay});
                    }
                    event.preventDefault();
                    $inputMonthElement.value = String(inputMonth);
                }
            }
        } else if(event.key == "ArrowUp"){
            if(eventValue == maxDay){
                if(inputMonth == 12 && inputYear == 9999){
                    event.preventDefault();
                } else {
                    if(inputMonth == 12){
                        if(inputYear == -1){
                            inputYear = 1;
                        } else {
                            inputYear++;
                        }
                        inputMonth = 1;
                        $inputYearElement.value = String(inputYear);
                    } else {
                        inputMonth++;
                        maxDay = monthRange(inputYear, inputMonth);
                        $inputDayElement.max = String(maxDay);
                    }
                    currentTarget.value = "1";
                    event.preventDefault();
                    person[elementNum].setBirthday({"year": inputYear, "month": inputMonth, "day": 1});
                    $inputMonthElement.value = String(inputMonth);
                }
            }
        } else if(event.key == "-"){
            event.preventDefault();
        } else if(NUM_KEY.includes(event.key)){
            if(currentTarget.value.length >= 2){
                event.preventDefault();
            } else if(currentTarget.value.length == 1 && eventValue != 1){
                switch(maxDay){
                    case 28:
                        if((eventValue == 2 && eventKey == 9) || eventValue > 2){
                            currentTarget.value = "28";
                            person[elementNum].setDay(28);
                            event.preventDefault();
                        }
                        break;
                    case 29:
                        if(eventValue >= 3){
                            currentTarget.value = "29";
                            person[elementNum].setDay(29);
                            event.preventDefault();
                        }
                    case 30:
                        if((eventValue == 3 && eventKey != 0) || eventValue > 3){
                            currentTarget.value = "30";
                            person[elementNum].setDay(30);
                            event.preventDefault();
                        }
                        break;
                    case 31:
                        if((eventValue == 3 && eventKey > 1) || eventValue > 3){
                            currentTarget.value = "31";
                            person[elementNum].setDay(31);
                            event.preventDefault();
                        }
                        break;
                    default:
                        break;
                }
            }
        }
    }
    const $calcBtnElement = document.getElementById(`calcBtn${elementNum}`) as HTMLButtonElement;
    if($calcBtnElement.disabled == true && IGNORE_ENABLE_KEY.includes(event.key) == false){
        $calcBtnElement.disabled = false;
        $calcBtnElement.innerText = "計算する";
        $calcResult.classList.add("enableCalc");
    }
}
// 変更時
function SanitizingBirthdayChange(event: Event){
    // 変数宣言
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLInputElement)){
        return;
    }
    let orgText = currentTarget.value;
    let editedStr = orgText.split("");
    let elementNum = Number(String(currentTarget.id).slice(-1)); // 変更された欄のidの最後の一文字がカレンダーのインデックスを表す
    for(let i = 0; i < editedStr.length; i++){
        if(currentTarget.id == `inputYear${elementNum}`){
            if(!(NUM_KEY.includes(editedStr[i]) || editedStr[i] == "-")){
                orgText = orgText.replace(editedStr[i], "");
            }
            if(Number(orgText) < -3113){
                currentTarget.value = "-3113";
            }
        } else {
            if(!NUM_KEY.includes(editedStr[i])){
                orgText = orgText.replace(editedStr[i], "");
            }
        }
    }
    let orgTextNum = Number(orgText);
    let maxDay: number;
    const $calcBtnElement = document.getElementById(`calcBtn${elementNum}`) as HTMLButtonElement;
    // 数値入力
    if(currentTarget.id == `inputYear${elementNum}`){
        if(orgTextNum == 0){
            orgText = String(today.getFullYear() - 30);
        } else if(orgTextNum < -3113){
            orgText = "-3113";
        } else if(orgTextNum > 9999){
            orgText = "9999";
        }
        person[elementNum].setYear(Number(orgText));
    } else if(currentTarget.id == `inputMonth${elementNum}`){
        if(orgTextNum == 0){
            orgText = String(today.getMonth() + 1);
        } else if(orgTextNum < 1){
            orgText = "1";
        } else if(orgTextNum > 12){
            orgText = "12";
        }
        person[elementNum].setMonth(Number(orgText));
    } else if(currentTarget.id == `inputDay${elementNum}`){
        if(orgTextNum == 0){
            orgText = String(today.getDate());
        } else if(orgTextNum < 1){
            orgText = "1";
        }
        person[elementNum].setDay(Number(orgText));
    }
    maxDay = monthRange(person[elementNum].getYear(), person[elementNum].getMonth());
    if(person[elementNum].getDay() > maxDay){
        person[elementNum].setDay(maxDay);
    }
    setInputValue("", person[elementNum].getYear(), person[elementNum].getMonth(), person[elementNum].getDay(), maxDay, elementNum);
    if($calcBtnElement.disabled == true){
        $calcBtnElement.disabled = false;
        $calcBtnElement.innerText = "計算する";
        $calcResult.classList.add("enableCalc");
    }
}
for(const $inputBirth of $inputBirths){
    $inputBirth.addEventListener("keydown", SanitizingBirthdayKeydown);
    $inputBirth.addEventListener("change", SanitizingBirthdayChange);
}

// [計算する]ボタンがクリックされたとき
function CalcBtnClicked(event: MouseEvent){
    const {currentTarget} = event;
    if(!(currentTarget instanceof HTMLButtonElement)){
        return;
    }
    CalcKINResult(currentTarget.id);
    if(CalcDoneCheck() == true){
        $calcResult.classList.remove("enableCalc");
    }
}
for(const $calcBtn of $calcBtns){
    $calcBtn.addEventListener("click", CalcBtnClicked);
}
// 計算結果ラベルがクリックされたとき
function CalcResultLabelClicked(){
    for(let i = 1; i <= calendarCount; i++){
        const $calcBtnElement = document.getElementById(`calcBtn${i}`) as HTMLButtonElement;
        if($calcBtnElement.disabled == false){
            CalcKINResult(`calcBtn${i}`);
            PageScroll("kinBirthday", "calc");
        }
    }
    $calcResult.classList.remove("enableCalc");
}
$calcResult.addEventListener("click", CalcResultLabelClicked);

// ----------------------------------------------------------------------------------------------------
// 計算
// ----------------------------------------------------------------------------------------------------

// 年月日からKINを計算
function CalcKINNum(calcYear: number, calcMonth: number, calcDay: number){
    // 変数宣言
    let specifiedDate: number;
    let dateDiff: number;
    let kinNum: number = 0;
    // 計算
    if(calcYear > 0){
        specifiedDate = new Date(calcYear + 2000, calcMonth - 1, calcDay).getTime() - new Date(2001, 0, 1).getTime();
        dateDiff = ~~(specifiedDate / CALC_DATE_DIFF); // 時間のずれを丸め込む(日数には誤差が出ない)
        for(let i = 0; i < calcYear - 1; i++){ // うるう年の数だけ日数を引く
            if(monthRange(i + 1, 2) == 29){
                dateDiff -= 1;
            }
        }
        if(monthRange(calcYear, 2) == 29 && calcMonth >= 3){
            dateDiff -= 1;
        }
        kinNum = (dateDiff + 78) % 260;
    } else if(calcYear < 0){
        specifiedDate = new Date(calcYear, calcMonth - 1, calcDay).getTime() - new Date(KIN_START, 0, 1).getTime(); // マヤ暦の始まり、なぜか時間がずれる
        dateDiff = ~~(specifiedDate / CALC_DATE_DIFF); // 時間のずれを丸め込む(日数には誤差が出ない)
        for(let i = KIN_START; i < calcYear - 1; i++){ // うるう年の数だけ日数を引く
            if(monthRange(i + 1, 2) == 29){
                dateDiff -= 1;
            }
        }
        if(monthRange(calcYear, 2) == 29 && calcMonth >= 3){
            dateDiff -= 1;
        }
        kinNum = (dateDiff + 33) % 260;
    }
    if(kinNum == 0){
        kinNum = 260;
    }
    return kinNum;
}
// ツォルキンの計算を計算
function CalcADToKIN(calcYear: number, calcMonth: number, calcDay: number, dataSel = ["ALL"]){
    // 変数宣言
    let kinNum = CalcKINNum(calcYear, calcMonth, calcDay);
    let sunCrest = (kinNum - 1) % 20 + 1;
    let soundNum = (kinNum - 1) % 13 + 1;
    let addKinInfo = "";
    let kinCastelInfo = "";
    let kinCastelNum = 0;
    let guideSel = soundNum % 5;
    let guideNum = 0;
    let reverseGuideNum = 0;
    let kinResult: string[][] = [];
    // KIN
    if(dataSel.includes("ALL") || dataSel.includes("KINNum")){
        if(kinNum % 19 == 0){
            addKinInfo += " (絶対拡張KIN)";
        }
        if([10, 15, 20].includes(sunCrest)){
            if([3, 4, 10, 11].includes(soundNum)){
                addKinInfo += " (極性KIN)";
            }
        }
        if(BLACK_KIN_NUM.includes(kinNum)){
            addKinInfo += " (黒KIN)";
        }
        kinResult.push(["KIN", String(kinNum) + addKinInfo]);
    }
    // SC
    if(dataSel.includes("ALL") || dataSel.includes("SC")){
        kinResult.push(["SC", KINLIST[sunCrest - 1]]);
    }
    // WS
    if(dataSel.includes("ALL") || dataSel.includes("WS")){
        kinResult.push(["WS", KINLIST[~~((kinNum - 1) / 13) * 13 % 20]]);
    }
    // 銀河の音
    if(dataSel.includes("ALL") || dataSel.includes("銀河の音")){
        kinResult.push(["銀河の音", `音${soundNum}`]);
    }
    // 5つの城
    if(dataSel.includes("ALL") || dataSel.includes("5つの城")){
        kinCastelNum = ~~((kinNum - 1) / 52);
        if(kinCastelNum == 0){
            kinCastelInfo = "回転の赤い東の城";
        } else if(kinCastelNum == 1){
            kinCastelInfo = "交差の白い北の城";
        } else if(kinCastelNum == 2){
            kinCastelInfo = "燃える青い西の城";
        } else if(kinCastelNum == 3){
            kinCastelInfo = "与える黄色い南の城";
        } else {
            kinCastelInfo = "魅惑の緑の中央の城";
        }
        kinResult.push(["5つの城",kinCastelInfo]);
    }
    // 反対KIN
    if(dataSel.includes("ALL") || dataSel.includes("反対KIN")){
        kinResult.push(["反対KIN", KINLIST[(sunCrest + 9) % 20]]);
    }
    // 類似KIN
    if(dataSel.includes("ALL") || dataSel.includes("類似KIN")){
        kinResult.push(["類似KIN", KINLIST[(38 - sunCrest) % 20]]);
    }
    // 神秘KIN
    if(dataSel.includes("ALL") || dataSel.includes("神秘KIN")){
        kinResult.push(["神秘KIN", KINLIST[(20 - sunCrest)]]);
    }
    // ガイドKIN
    if(dataSel.includes("ALL") || dataSel.includes("ガイドKIN")){
        if(guideSel == 1){
            guideNum = sunCrest - 1;
        } else if(guideSel == 2){
            guideNum = (sunCrest + 11) % 20;
        } else if(guideSel == 3){
            guideNum = (sunCrest + 3) % 20;
        } else if(guideSel == 4){
            guideNum = (sunCrest + 15) % 20;
        } else {
            guideNum = (sunCrest + 7) % 20;
        }
        kinResult.push(["ガイドKIN", KINLIST[guideNum]]);
    }
    // 逆ガイドKIN
    if(dataSel.includes("ALL") || dataSel.includes("逆ガイドKIN")){
        if(guideSel == 1){
            reverseGuideNum = sunCrest - 1;
        } else if(guideSel == 2){
            reverseGuideNum = (sunCrest + 7) % 20;
        } else if(guideSel == 3){
            reverseGuideNum = (sunCrest + 15) % 20;
        } else if(guideSel == 4){
            reverseGuideNum = (sunCrest + 3) % 20;
        } else {
            reverseGuideNum = (sunCrest + 11) % 20;
        }
        kinResult.push(["逆ガイドKIN", KINLIST[reverseGuideNum]]);
    }
    // 鏡KIN
    if(dataSel.includes("ALL") || dataSel.includes("鏡KIN")){
        kinResult.push(["鏡KIN", `${261 - kinNum} (WS : ${KINLIST[~~((260 - kinNum) / 13) * 13 % 20]})`]);
    }

    return kinResult;
}
// KIN周期表を計算
function CalcKINCycle(calcYear: number, calcMonth: number, calcDay: number, calcRange: number){
    // 変数宣言
    let kinCycle: string[][] = [];
    let firstBCDate = new Date(KIN_START, 0, 1);
    let firstADDate = new Date(2001, 0, 1);
    let maxADDate = new Date(11999, 11, 31);
    let maxBCDate = new Date(-1, 11, 31);
    let dateLim = 0;
    let dateCntYear = 0;
    let birthday = new Date();
    let dateCnt = new Date();
    let dateDiffCnt = 0;
    let i = 0;
    // 周期分引いた日付を計算
    if(calcYear > 0){
        birthday = new Date(calcYear + 2000, calcMonth - 1, calcDay);
        dateCnt = new Date(calcYear + 2000, calcMonth - 1, calcDay);
        dateDiffCnt = ~~((birthday.getTime() - firstADDate.getTime()) / CALC_DATE_DIFF);
        for(let i = 1; i < calcYear; i++){
            if(monthRange(i + 2000, 2) == 29){
                dateDiffCnt--;
            }
        }
        if(monthRange(calcYear + 2000, 2) == 29 && calcMonth >= 3){
            dateDiffCnt--;
        }
    } else if(calcYear < 0){
        birthday = new Date(calcYear, calcMonth - 1, calcDay);
        dateCnt = new Date(calcYear, calcMonth - 1, calcDay);
        dateDiffCnt = ~~((birthday.getTime() - firstBCDate.getTime()) / CALC_DATE_DIFF);
        for(i = -3113; i < calcYear; i++){
            if(monthRange(i + 2000, 2) == 29){
                dateDiffCnt--;
            }
        }
    }
    for(i = 0; i < calcRange; i++){
        if(dateDiffCnt >= 260){
            dateDiffCnt -= 260;
            if(monthRange(new Date(dateCnt).getFullYear(), 2) == 29){
                if(!((dateCnt.getMonth() + 1 == 11 && dateCnt.getDate() >= 16) || dateCnt.getMonth() + 1 == 12)){
                    if(dateCnt.getMonth() + 1 >= 3){
                        dateCnt.setDate(dateCnt.getDate() - 1);
                    }
                }
            }
            dateCnt.setDate(dateCnt.getDate() - 260);
        } else {
            if(dateCnt.getFullYear() > 0){
                dateCnt = new Date(-1, 11, dateDiffCnt - 228);
                dateDiffCnt += BC_DATE - 228;
            } else {
                break;
            }
        }
    }
    // 周期表データの作成
    if(dateCnt.getFullYear() > 0){
        dateCntYear = dateCnt.getFullYear() - 2000;
    } else {
        dateCntYear = dateCnt.getFullYear();
    }
    if(birthday.getTime() == dateCnt.getTime()){
        if(monthRange(dateCnt.getFullYear(), 2) == 29){
            if(dateCnt.getMonth() + 1 == 2 && dateCnt.getDate() == 29){
                kinCycle.push([`${dateCntYear}年2月29日`, "誕生日"]);
                dateCnt.setDate(dateCnt.getDate() + 1);
                kinCycle.push([`${dateCntYear}年3月1日`, "翌日"]);
            } else if(dateCnt.getMonth() + 1 == 3 && dateCnt.getDate() == 1){
                kinCycle.push([`${dateCntYear}年2月29日`, "前日"]);
                kinCycle.push([`${dateCntYear}年3月1日`, "誕生日"]);
            } else {
                kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, "誕生日"]);
            }
        } else {
            kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, "誕生日"]);
        }
    } else {
        if(monthRange(dateCnt.getFullYear(), 2) == 29){
            if(dateCnt.getMonth() + 1 == 2 && dateCnt.getDate() == 29){
                kinCycle.push([`${dateCntYear}年2月29日`, `${-i}周期`]);
                dateCnt.setDate(dateCnt.getDate() + 1);
            } else if(dateCnt.getMonth() + 1 == 3 && dateCnt.getDate() == 1){
                kinCycle.push([`${dateCntYear}年2月29日`, `${-i}周期`]);
            }
        }
        kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, `${-i}周期`]);
    }
    if(dateCnt.getFullYear() > 0){
        dateLim = ~~((maxADDate.getTime() - dateCnt.getTime()) / CALC_DATE_DIFF);
    } else {
        dateLim = ~~((maxBCDate.getTime() - dateCnt.getTime()) / CALC_DATE_DIFF);
    }
    for(let j = 0; j < calcRange + i; j++){
        if(dateLim >= 260){
            dateCnt.setDate(dateCnt.getDate() + 260);
            if(dateCnt.getFullYear() > 0){
                dateLim = ~~((maxADDate.getTime() - dateCnt.getTime()) / CALC_DATE_DIFF);
                dateCntYear = dateCnt.getFullYear() - 2000;
            } else {
                dateLim = ~~((maxBCDate.getTime() - dateCnt.getTime()) / CALC_DATE_DIFF);
                dateCntYear = dateCnt.getFullYear();
            }
            if(birthday.getTime() == dateCnt.getTime() || birthday.getTime() == new Date(dateCnt.getFullYear(), dateCnt.getMonth(), dateCnt.getDate() + 1).getTime()){
                if(monthRange(dateCnt.getFullYear(), 2) == 29){
                    if(dateCnt.getMonth() + 1 == 2 && dateCnt.getDate() == 29){
                        kinCycle.push([`${dateCntYear}年2月29日`, "誕生日"]);
                        dateCnt.setDate(dateCnt.getDate() + 1);
                        kinCycle.push([`${dateCntYear}年3月1日`, "翌日"]);
                    } else if(dateCnt.getMonth() + 1 >= 3){
                        if(dateCnt.getMonth() + 1 == 3 && dateCnt.getDate() == 1){
                            kinCycle.push([`${dateCntYear}年2月29日`, "前日"]);
                            kinCycle.push([`${dateCntYear}年3月1日`, "誕生日"]);
                            dateCnt.setDate(dateCnt.getDate() + 1);
                        } else {
                            if(!((dateCnt.getMonth() + 1 == 11 && dateCnt.getDate() >= 16) || dateCnt.getMonth() + 1 == 12)){
                                dateCnt.setDate(dateCnt.getDate() + 1);
                            }
                            kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, "誕生日"]);
                        }
                    } else {
                        kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, "誕生日"]);
                    }
                } else {
                    kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, "誕生日"]);
                }
            } else {
                if(monthRange(dateCnt.getFullYear(), 2) == 29){
                    if(dateCnt.getMonth() + 1 == 2 && dateCnt.getDate() == 29){
                        kinCycle.push([`${dateCntYear}年2月29日`, `${j - i + 1}周期`]);
                        dateCnt.setDate(dateCnt.getDate() + 1);
                        kinCycle.push([`${dateCntYear}年3月1日`, `${j - i + 1}周期`]);
                    } else if(dateCnt.getMonth() + 1 >= 3){
                        if(dateCnt.getMonth() + 1 == 3 && dateCnt.getDate() == 1){
                            kinCycle.push([`${dateCntYear}年2月29日`, `${j - i + 1}周期`]);
                            kinCycle.push([`${dateCntYear}年3月1日`, `${j - i + 1}周期`]);
                            dateCnt.setDate(dateCnt.getDate() + 1);
                        } else {
                            if(!((dateCnt.getMonth() + 1 == 11 && dateCnt.getDate() >= 16) || dateCnt.getMonth() + 1 == 12)){
                                dateCnt.setDate(dateCnt.getDate() + 1);
                            }
                            kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, `${j - i + 1}周期`]);
                        }
                    } else {
                        kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, `${j - i + 1}周期`]);
                    }
                } else {
                    kinCycle.push([`${dateCntYear}年${dateCnt.getMonth() + 1}月${dateCnt.getDate()}日`, `${j - i + 1}周期`]);
                }
            }
            if(dateLim < 260 && dateCntYear < 0){
                dateCnt = new Date(2001, 0, -dateLim);
                dateLim = ~~((maxADDate.getTime() - dateCnt.getTime()) / CALC_DATE_DIFF);
            }
        } else {
            break;
        }
    }
    return kinCycle;
}
// Haabの計算を計算
function CalcHaabCalendar(calcMonth: number, calcDay: number){
    // 変数宣言
    let HaabOrg = new Date();
    let HaabBirthday = new Date(2000, calcMonth - 1, calcDay);
    let HaabDiff = 0;
    let HaabSel = 0;
    let HaabNum = 0;
    // Haabの計算
    if((calcMonth >= 3 && calcMonth <= 6) || (calcMonth == 7 && calcDay <= 25)){
        HaabOrg = new Date(2000, 7 - 1, 26);
        HaabDiff = ~~((HaabBirthday.getTime() - HaabOrg.getTime()) / CALC_DATE_DIFF) + 365;
    } else {
        if(calcMonth <= 2){
            HaabOrg = new Date(2000, 7 - 1, 25);
            HaabDiff = ~~((HaabBirthday.getTime() - HaabOrg.getTime()) / CALC_DATE_DIFF) + 365;
        } else {
            HaabOrg = new Date(2000, 7 - 1, 26);
            HaabDiff = ~~((HaabBirthday.getTime() - HaabOrg.getTime()) / CALC_DATE_DIFF);
        }
    }
    HaabSel = ~~(HaabDiff / 20);
    HaabNum = HaabDiff % 20 + 1;
    return ["Haab", `${HAAB_LIST[HaabSel]}-${HaabNum}`];
}

// ----------------------------------------------------------------------------------------------------
// 表示
// ----------------------------------------------------------------------------------------------------

// カレンダーの表示状態を保存
function GetCalendarHidden(){
    for(let i = 1; i < $resultForm.children.length; i++){
        const $hiddenElement = $resultForm.children[i] as HTMLElement;
        calendar.status[$hiddenElement.id].setHidden($hiddenElement.hidden);
    }
}
// カレンダーの増減時に一時的に非表示にする
function ChangeCalendarCnt(enableHide: boolean){
    if(enableHide == true){
        GetCalendarHidden();
        calendar.hideAllCalendar();
    } else {
        calendar.showCalendar();
    }
}
// カレンダーの表示/非表示
function PageHidden(index: number, hide: boolean){
    const $birthdayInfoElement = document.getElementById(`birthdayInfo${index}`) as HTMLDivElement;
    const $birthdayInfoHeaderElement = document.getElementById(`birthdayInfo${index}Header`) as HTMLDivElement;
    const $inputFormElement = document.getElementById(`inputForms${index}`) as HTMLDivElement;
    $birthdayInfoElement.hidden = hide;
    $birthdayInfoHeaderElement.hidden = hide;
    $inputFormElement.hidden = hide;
    for(let i = 1; i < $resultForm.children.length; i++){
        let idStr = `${$resultForm.children[i].id}Table${index}`;
        const $hiddenElement = document.getElementById(idStr) as HTMLDivElement;
        $hiddenElement.hidden = hide;
    }
}

// テーブルの中身を削除
function DeleteTable(index: number){
    for(let i = 1; i < $resultForm.children.length; i++){
        let idStr = `${$resultForm.children[i]}Calc${index}`;
        const $hiddenElement = document.getElementById(idStr) as HTMLTableSectionElement;
        while($hiddenElement.firstChild){
            $hiddenElement.removeChild($hiddenElement.firstChild);
        }
    }
}
// テーブルの作成
function GenerateTable(birthdayKINData: string[][], $pasteTable: HTMLTableSectionElement){
    let pasteData: HTMLTableRowElement[] = [];
    let pasteCell: HTMLTableCellElement;
    // テーブルを初期化
    while($pasteTable.firstChild){
        $pasteTable.removeChild($pasteTable.firstChild);
    }
    // 指定されたインデックスのテーブルに結果を生成
    for(let i = 0; i < birthdayKINData.length; i++){
        pasteData.push($pasteTable.insertRow(-1));  // 行の追加
        for(let j = 0; j < birthdayKINData[0].length; j++){
            pasteCell = pasteData[i].insertCell(-1);
            pasteCell.appendChild(document.createTextNode(birthdayKINData[i][j]));
        }
    }
}

// KINカレンダーの取得
function Get_kinBirthdayData(calcYear: number, calcMonth: number, calcDay: number){
    return CalcADToKIN(calcYear, calcMonth, calcDay, ["KINNum", "SC", "WS", "銀河の音", "5つの城"]);
}
// 相性比較表の取得
function Get_compareKINData(calcYear: number, calcMonth: number, calcDay: number){
    // 変数宣言
    let compareData: string[][] = [];
    let compareSC = CalcADToKIN(calcYear, calcMonth, calcDay, ["反対KIN", "類似KIN", "神秘KIN"]);
    let compareWS: string[][] = [];
    let compareOthers = CalcADToKIN(calcYear, calcMonth, calcDay, ["ガイドKIN", "逆ガイドKIN", "鏡KIN"]);
    let orgWS = CalcADToKIN(calcYear, calcMonth, calcDay, ["WS"]);
    let WSNum = KINLIST.indexOf(orgWS[0][1]) + 1;
    // 計算
    compareSC[0].splice(0, 1, "SC反対KIN");
    compareSC[1].splice(0, 1, "SC類似KIN");
    compareSC[2].splice(0, 1, "SC神秘KIN");
    compareWS.push(["WS反対KIN", KINLIST[(WSNum + 9) % 20]]);
    compareWS.push(["WS類似KIN", KINLIST[(38 - WSNum) % 20]]);
    compareWS.push(["WS神秘KIN", KINLIST[(20 - WSNum)]]);
    compareData = compareSC.concat(compareWS).concat(compareOthers);
    return compareData;
}
// その他の暦の取得
function Get_otherCalendarData(calcYear: number, calcMonth: number, calcDay: number){
    let otherCalendarData: {[key: string]: string[]} = {};
    otherCalendarData["haabData"] = CalcHaabCalendar(calcMonth, calcDay);
    return otherCalendarData;
}
// 起承転結の取得
function Get_storyKINData(calcYear: number, calcMonth: number, calcDay: number){
    let SC =  (CalcKINNum(calcYear, calcMonth, calcDay) - 1) % 20;
    let kinStoryData: string[][] = [];
    for(let i = 0; i < 4; i++){
        if(KINLIST[SC].includes("赤い")){
            kinStoryData.push(["起", KINLIST[SC]]);
            SC = (SC + 5) % 20;
            kinStoryData.push(["承", KINLIST[SC]]);
            SC = (SC + 5) % 20;
            kinStoryData.push(["転", KINLIST[SC]]);
            SC = (SC + 5) % 20;
            kinStoryData.push(["結", KINLIST[SC]]);
            break;
        } else {
            SC = (SC + 5) % 20;
        }
    }
    return kinStoryData;
}
// 個人KIN年表の取得
function Get_personalKINData(calcYear: number, calcMonth: number, calcDay: number){
    let personalKINData: string[][] = [];
    let kinNum = CalcKINNum(calcYear, calcMonth, calcDay);
    let SC = (kinNum - 1) % 20;
    let WS = ~~((kinNum - 1) / 13) * 13 % 20;
    let sound = (kinNum - 1) % 13 + 1;
    personalKINData.push([`${calcYear}年(0歳)`, KINLIST[SC], KINLIST[WS], `音${sound}`]);
    for(let i = 1; i <= 104; i++){
        if(SC >= 15){
            SC -= 15;
        } else {
            SC += 5;
        }
        if(sound == 13){
            if(WS >= 3){
                WS -= 3;
            } else {
                WS += 17;
            }
            sound = 1;
        } else {
            if(WS >= 16){
                WS -= 16;
            } else {
                WS += 4;
            }
            sound++;
        }
        personalKINData.push([`${calcYear + i}年(${i}歳)`, KINLIST[SC], KINLIST[WS], `音${sound}`]);
    }
    return personalKINData;
}
// KIN周期表を取得
function Get_kinCycleData(calcYear: number, calcMonth: number, calcDay: number, calcRange: number){
    return CalcKINCycle(calcYear, calcMonth, calcDay, calcRange);
}

// 全ての結果を取得
function Get_allCalendarData(calcYear: number, calcnMonth: number, calcDay: number, calcRange: number){
    let allCalendarData: {[key: string]: string[][]} = {};
    allCalendarData["kinBirthday"] = Get_kinBirthdayData(calcYear, calcnMonth, calcDay);
    allCalendarData["compareKIN"] = Get_compareKINData(calcYear, calcnMonth, calcDay);
    allCalendarData["otherCalendar"] = Object.values(Get_otherCalendarData(calcYear, calcnMonth, calcDay));
    allCalendarData["storyKIN"] = Get_storyKINData(calcYear, calcnMonth, calcDay);
    allCalendarData["personalKIN"] = Get_personalKINData(calcYear, calcnMonth, calcDay);
    allCalendarData["kinCycle"] = Get_kinCycleData(calcYear, calcnMonth, calcDay, calcRange);
    return allCalendarData;
}

// KINカレンダーの表示
function Show_kinBirthday(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $kinBirthdayCalc = document.getElementById(`kinBirthdayCalc${elementNum}`) as HTMLTableSectionElement;
    let birthdayKINData = Get_kinBirthdayData(calcYear, calcMonth, calcDay);
    GenerateTable(birthdayKINData, $kinBirthdayCalc);
}
// 相性比較表の表示
function Show_compareKIN(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $compareKINCalc = document.getElementById(`compareKINCalc${elementNum}`) as HTMLTableSectionElement;
    let compareKINData = Get_compareKINData(calcYear, calcMonth, calcDay);
    GenerateTable(compareKINData, $compareKINCalc);
}
// その他の暦の表示
function Show_otherCalendar(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $otherCalendarCalc = document.getElementById(`otherCalendarCalc${elementNum}`) as HTMLTableSectionElement;
    let orgOtherCalendarData = Get_otherCalendarData(calcYear, calcMonth, calcDay);
    let otherCalendarData: string[][] = [];
    for(let key in orgOtherCalendarData){
        otherCalendarData.push(orgOtherCalendarData[key]);
    }
    GenerateTable(otherCalendarData, $otherCalendarCalc);
}
// 起承転結の表示
function Show_storyKIN(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $storyKINCalc = document.getElementById(`storyKINCalc${elementNum}`) as HTMLTableSectionElement;
    let kinStory = Get_storyKINData(calcYear, calcMonth, calcDay);
    GenerateTable(kinStory, $storyKINCalc);
}
// 個人KIN年表の表示
function Show_personalKIN(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $personalKINCalc = document.getElementById(`personalKINCalc${elementNum}`) as HTMLTableSectionElement;
    let personalKINList = Get_personalKINData(calcYear, calcMonth, calcDay);
    GenerateTable(personalKINList, $personalKINCalc);
}
// KIN周期表の表示
function Show_kinCycle(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    const $kinCycleCalc = document.getElementById(`kinCycleCalc${elementNum}`) as HTMLTableSectionElement;
    let kinCycle = CalcKINCycle(calcYear, calcMonth, calcDay, Number($inputKINCycleRange.value));
    GenerateTable(kinCycle, $kinCycleCalc);
}

// 計算結果を表示
function ShowKINTable(calcYear: number, calcMonth: number, calcDay: number, elementNum: number){
    // KINカレンダー
    if(calendar.status[$kinBirthday.id].getHidden() == false){
        Show_kinBirthday(calcYear, calcMonth, calcDay, elementNum);
    }
    // 相性比較表
    if(calendar.status[$compareKIN.id].getHidden() == false){
        Show_compareKIN(calcYear, calcMonth, calcDay, elementNum);
    }
    // 他の暦
    if(calendar.status[$otherCalendar.id].getHidden() == false){
        Show_otherCalendar(calcYear, calcMonth, calcDay, elementNum);
    }
    // 起承転結
    if(calendar.status[$storyKIN.id].getHidden() == false){
        Show_storyKIN(calcYear, calcMonth, calcDay, elementNum);
    }
    // 個人KIN年表
    if(calendar.status[$personalKIN.id].getHidden() == false){
        Show_personalKIN(calcYear, calcMonth, calcDay, elementNum);
    }
    // KIN周期表
    if(calendar.status[$kinCycle.id].getHidden() == false){
        Show_kinCycle(calcYear, calcMonth, calcDay, elementNum);
    }
}
// 数値の修正後に計算および表示を行う
function CalcKINResult(eventId: string){
    // 変数宣言
    let elementNum = Number(String(eventId).slice(-1)); // クリックされたボタンのidの最後の一文字がカレンダーのインデックスを表す
    let orgText = "";
    let orgTextNum = 0;
    let editedStr: string[];
    let calcYear = 0;
    let calcMonth = 0;
    let calcDay = 0;
    let maxDay = 0;
    const $inputYearElement = document.getElementById(`inputYear${elementNum}`) as HTMLInputElement;
    const $inputMonthElement = document.getElementById(`inputMonth${elementNum}`) as HTMLInputElement;
    const $inputDayElement = document.getElementById(`inputDay${elementNum}`) as HTMLInputElement;
    const $calcBtnElement = document.getElementById(`calcBtn${elementNum}`) as HTMLButtonElement;
    // 不要な文字の除外や数値の正常化
    // 年
    orgText = $inputYearElement.value;
    orgTextNum = Number(orgText);
    editedStr = orgText.split("");
    if(orgTextNum == 0){
        calcYear = today.getFullYear() - SHIFT_AGE;
    } else {
        if(orgTextNum < 0){
            calcYear = -1;
        }
        for(let i = 0; i < editedStr.length; i++){
            if(NUM_KEY.includes(editedStr[i]) == false){
                orgText = orgText.replace(editedStr[i], "");
            }
        }
        orgTextNum = Number(orgText)
        if(calcYear == -1){
            orgTextNum *= -1
        }
        calcYear = orgTextNum;
    }
    $inputYearElement.value = String(calcYear);
    // 月
    orgText = $inputMonthElement.value;
    orgTextNum = Number(orgText);
    editedStr = orgText.split("");
    if(orgTextNum == 0){
        calcMonth = today.getMonth() + 1;
    } else {
        for(let i = 0; i < editedStr.length; i++){
            if(NUM_KEY.includes(editedStr[i]) == false){
                orgText = orgText.replace(editedStr[i], "");
            }
        }
        calcMonth = Number(orgText);
    }
    $inputMonthElement.value = String(calcMonth);
    // 日
    orgText = $inputDayElement.value;
    orgTextNum = Number(orgText);
    editedStr = orgText.split("");
    if(orgTextNum == 0){
        calcDay = today.getDate();
    } else {
        for(let i = 0; i < editedStr.length; i++){
            if(NUM_KEY.includes(editedStr[i]) == false){
                orgText = orgText.replace(editedStr[i], "");
            }
        }
        calcDay = Number(orgText);
        maxDay = monthRange(calcYear, calcMonth);
        if(calcDay > maxDay){
            calcDay = maxDay;
        }
    }
    $inputDayElement.value = String(calcDay);
    person[elementNum].setBirthday({"year": calcYear, "month": calcMonth, "day": calcDay});
    // カレンダーの更新
    $calcBtnElement.disabled = true;
    $calcBtnElement.innerText = "計算済";
    ChangeBirthday(elementNum);
    ShowKINTable(calcYear, calcMonth, calcDay, elementNum);
}
