const resetAtMidnight = () => {
  const now = new Date()
  const night = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  const msToMidnight = night.getTime() - now.getTime()

  setTimeout(async () => {
    resetAtMidnight()
  }, msToMidnight)
}

resetAtMidnight()
