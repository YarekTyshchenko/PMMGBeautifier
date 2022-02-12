/**
 * This is a list of CCS styles that can be applied to buttons and fonts
 */
export const Style = {
  Button: ["_1VPBeuov5AYlOu4s7pKIlY"],
  ButtonPrimary: ["_1Y9l3J20Xn-CyxMZIcH06i"],
  ButtonSuccess: ["_3yZx55zAhax66rAfv6d6Z1"],
  ButtonDanger: ["_31dQZugJBAqjKvME7bRBlA"],
  SidebarSectionHead: ["CCGkvrSnzJdaNZHYPPEHp", "_33A_5lETf4HBqwJi_q-jhZ"],
  SidebarSectionContent: ["LmT6E6SUymEKlbZEY3tQ8", "_33A_5lETf4HBqwJi_q-jhZ"],
  SidebarLine: ["_258LbKlZRnQLY888Zg1cXb", "_24sz11_G6VXEYloo9FtRtZ"],
  FontsRegular: ["_1EHFMt11olvELFgH4xaNE8"],
}

export const WithStyles = (...style: string[][]): string[] => {
  return style.reduce(((previousValue, currentValue) =>
    previousValue.concat(currentValue))
  )
}
