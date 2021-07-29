# react-hooks

### #1.0 Introduction to useState

Hooks는 react의 state machine에 연결하는 기본적인 방법

가독성이 좋아지고, 함수형 프로그래밍이 가능해짐

```jsx
const App = () => {
  const [item, setItem] = useState(1);
  const incrementItem = () => setItem(item + 1);
  const decrementItem = () => setItem(item - 1);

  return (
    <>
      {item}
      <button onClick={incrementItem}>Increment</button>
      <button onClick={decrementItem}>decrement</button>
    </>
  );
};
```

hooks가 생기기 이전에는 함수형 component에서 state를 사용할 수 없었어, state를 가지고 작업하고 싶으면 class component를 만들었어야 했지. 거기다 class component에서는 this, render 같은 것을 사용하는 방법을 고려해야 했지만 이제 hook를 사용하면 그런거 신경 안써도 됨!

return에 뿌려주고 그 위에 적기만 하면 끝..!

```jsx
class AppUgly extends React.Component {
  state = {
    item: 1
  };
  incrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item + 1
      };
    });
  };
  decrementItem = () => {
    this.setState((state) => {
      return {
        item: state.item - 1
      };
    });
  };
  render() {
    const { item } = this.state;

    return (
      <>
        {item}
        <button onClick={this.incrementItem}>Increment</button>
        <button onClick={this.decrementItem}>decrement</button>
      </>
    );
  }
}
```

### #1.1 useInput

input을 업데이트함

```jsx
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (event) => {
    console.log(event.target);
  };
  return { value, onChange };
};

const App = () => {
  const name = useInput("Mr.");
  return (
    <>
      <h2>Hello</h2>
      <input placeholder="Name" {...name} />
    </>
  );
};
```

component가 아닌, 함수로 이벤트를 제어할 수 있어! 지금까지는 버튼이 눌렸을 때, 콘솔에 target을 찍어주는 형태로 동작

### #1.2 `useInput` part Two

- 조금 더 업데이트 시켜서 다른 사람들이 사용할 수 있도록 `npm`에 등록시키기
- 검증 코드를 추가함 ex) 글자수 제한, 특정 문자열 제한...

### #1.3 useTabs

- content 배열의 tab을 화면에 뿌려서 보여주고 tab을 클릭시 같은 배열 안에 있는 content를 화면에 뿌려줌

```jsx
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }
  const [currentIndex, setCurrentIndex] = useState(initialTab);
  return {
    currentItem: allTabs[currentIndex],
    changeItem: setCurrentIndex
  };
};

const App = () => {
  const { currentItem, changeItem } = useTabs(0, content);
  return (
    <div className="App">
      {content.map((section, index) => (
        <button onClick={() => changeItem(index)}>{section.tab}</button>
      ))}
      <div>{currentItem.content}</div>
    </div>
  );
};
```

## `useEffect`

### #2.0 Introduction to `useEffect`

`componentWillUnmount`, `componentDidMount`, `componentWillUpdate`

- `useEffect(func)`

  모든 변화를 감지하여 `func`을 실행

- `useEffect(func, [])`

  어떤 변화도 감지하지 않음, 렌더링됐을 때만 `func`을 실행

- `useEffect(func, [number])`

  `number` 가 변화할 때를 감지하여 `func` 실행 (`componentWillUpdate`)

```jsx
const App = () => {
  const sayHello = () => console.log("Hello");
  const [number, setNumber] = useState(0);
  const [aNumber, setANumber] = useState(0);
  useEffect(sayHello, []);

  return (
    <div className="App">
      <div>Hi</div>
      <button onClick={() => setNumber(number + 1)}>{number}</button>
      <button onClick={() => setANumber(aNumber + 1)}>{aNumber}</button>
    </div>
  );
};
```

### #2.2 useClick

- `useRef`: 컴포넌트의 일부를 선택할 수 있는 방법 (`getElementById`와 같은 동작)

```jsx
const useClick = (onClick) => {
  if (typeof onClick !== "function") {
    return;
  }
  const element = useRef();
  useEffect(() => {
    if (element.current) {
      element.current.addEventListener("click", onClick);
    }
    return () => {
      if (element.current) {
        element.current.removeEventListener("click", onClick);
      }
    };
  }, []);
  return element;
};
const App = () => {
  const sayHello = () => console.log("say hello");
  const title = useClick(sayHello);

  return (
    <div className="App">
      <h1 ref={title}>Hi</h1>
    </div>
  );
};
```
