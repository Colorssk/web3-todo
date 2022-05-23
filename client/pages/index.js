import React, { useState } from "react";
import Tabs from "../components/Tabs";
import TabContainer from '../components/TabContainer';
import Header from "../components/Header";
export default function Home() {
  const style = {
    wrapper:
      "h-screen w-screen bg-red select-none bg-[#2D2E2F] flex justify-start flex-col p-[24px]",
  };
  const [active, setActive] = useState('switch')
  const [defaultList] = useState([
    {
      label: "switchCurrency",
      value: "switch",
    },
    {
      label: "property",
      value: "property",
    },
    {
      label: "components",
      value: "components",
    },
  ]);
  return (
    <div className={style.wrapper}>
      <Header></Header>
      <Tabs list={defaultList} active={active} onChangeTab={(value)=>{setActive(value)}}></Tabs>
      <TabContainer></TabContainer>
    </div>
  );
}
