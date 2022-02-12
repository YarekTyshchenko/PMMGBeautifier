/**
 * This is a list of CCS styles that can be applied to buttons and fonts
 */
export const Style = {
  Button: ["fMW62cERnlzxZPFhnlPOeQ=="],
  ButtonPrimary: ["kgGsDNvDoWj61w4I7VAlfA=="],
  ButtonSuccess: ["QW80xveQm2GESkSORRH24g=="],
  ButtonDanger: ["ZFXWy4HCnztpZNlCXk83wQ=="],
  SidebarSectionHead: ["_2YrOM7-2sdK042VvH6WaJg==", "fTT52i+1oFauxHOjVfGTww=="],
  SidebarSectionContent: ["CN0NPNovlYtaIm4bqHFbLw==", "fTT52i+1oFauxHOjVfGTww=="],
  SidebarLine: ["y84EUI8gCP-SV91X7vIihQ==", "fVd3aYJhFY-uuaH+QTByhA=="],
  FontsRegular: ["CBorIbFC6Yt+FRYEHZyuaA=="],
}

export const WithStyles = (...style: string[][]): string[] => {
  return style.reduce(((previousValue, currentValue) =>
    previousValue.concat(currentValue))
  )
}
