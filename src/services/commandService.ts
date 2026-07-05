/**
 * Simulates sending a command to the tactical AI backend and getting a
 * response back. Swap the inner implementation for a real fetch()/API call
 * later without touching any component code.
 */
export function getCommandResponse(command: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI: Command [${command.toUpperCase()}] received. Processing request...`)
    }, 500)
  })
}
