import React, { useState } from 'react'

export default function SideDrawer() {
  const[search,setSearch] = useState("");
  const[searchResult,setSearchResult] = useState([]);
  const[loading,setLoading] = useState(false);
  const[loadingChat,setLoadingcChat] = useState();
  return (
    <div>

      SideDrawer
    </div>
  )
}
