import { useEffect, useMemo, useState } from 'react'

type returnData = [boolean, { onToggle: () => void; open: () => void; close: () => void }]

export const useBoolean = (defaultBoolean?: boolean): returnData => {
  const [toggle, setToggle] = useState<boolean>(!!defaultBoolean)

  const handlers = useMemo(
    () => ({
      onToggle: () => setToggle(prevToggle => !prevToggle),
      open: () => setToggle(true),
      close: () => setToggle(false),
    }),
    [],
  )

  useEffect(() => {
    setToggle(!!defaultBoolean)
  }, [defaultBoolean])

  return [toggle, handlers]
}
