export const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    agentType: string,
    currentId: number,
    nextType: string,
    nextId: number | null
  ) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const inputs = Array.from(
        document.querySelectorAll('input[type="text"]')
      ) as HTMLInputElement[];
      const currentIndex = inputs.findIndex((input) => input === e.target);

      const newIndex =
        e.key === "ArrowDown" ? currentIndex + 1 : Math.max(currentIndex - 1, 0);

      if (inputs[newIndex]) {
        inputs[newIndex].focus();
      }
    }
  };