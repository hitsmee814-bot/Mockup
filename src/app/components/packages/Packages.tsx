"use client"

import { useEffect } from "react"

export default function Packages() {

  const changeUrl = () => {
    window.history.pushState(
      {},
      "",
      "/itinerary/packages/greece-trip/mid-plan"
    )
  }

  return (
    <div>
      Hii
      <button onClick={changeUrl}>
        Change URL
      </button>
    </div>
  )
}