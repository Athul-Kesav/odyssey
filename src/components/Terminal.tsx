import React, { useState, useRef, useEffect } from "react";

interface TerminalLine {
  text: string;
  error?: boolean;
}

interface TerminalProps {
  onOpenFile: (file: FileData) => void;
}

export type FileData = {
  name: string;
  content: string; // For text files, this can be text content or a file path. For images, a URL or path.
  type: "text" | "image";
};

// A custom generateFolder function that accepts an array of FileData objects.
export const generateFolder = (files: FileData[]) => {
  return files.reduce<Record<string, FileData>>((acc, file) => {
    acc[file.name] = file;
    return acc;
  }, {});
};

// Define your file system using custom folders and files.
export const fileSystem = {
  root: {
    config: generateFolder([
      {
        name: "settings.json",
        content: `{
    "albis": true,
    "notifications": true,
    "autoUpdate": false,
    "backupFrequency": "weekly"
  }`,
        type: "text",
      },
      {
        name: "app.config",
        content: `[Application]
  name=Matrix Terminal
  version=4.2.1
  log_level=debug
  auto_sync=true`,
        type: "text",
      },
    ]),
    users: generateFolder([
      {
        name: "user1.profile",
        content: `{
    "username": "Neo",
    "role": "Admin",
    "status": "Awakened"
  }`,
        type: "text",
      },
      {
        name: "user2.profile",
        content: `{
    "username": "Trinity",
    "role": "worker",
    "status": "Active"
  }`,
        type: "text",
      },
    ]),
    backups: generateFolder([
      {
        name: "backup-2050-02-28.zip",
        content: `Encrypted backup file.
        Created: 2050-02-28 03:14 UTC.`,
        type: "text",
      },
    ]),
    logs: generateFolder([
      {
        name: "system.log",
        content: `[2050-02-26 08:45:12] System booting...
  [2050-02-26 08:45:14] Services initialized.
  [2050-02-26 08:46:01] User 'Neo' logged in.
  [2050-02-26 08:47:23] Connection to Mainframe established.`,
        type: "text",
      },
      {
        name: "error.log",
        content: `[2050-02-26 09:05:34] ERROR: Failed to load module 'ai-core.dll'.
  [2050-02-27 09:06:12] WARNING: Unusual activity detected from IP 192.168.1.42.
  [2050-02-28 09:07:45] CRITICAL: Unauthorized access attempt detected!`,
        type: "text",
      },
    ]),
    secrets: generateFolder([
      {
        name: "apikey.txt",
        content: "ghijhbAEFF244dEFSDCsdfr@dsf#dfch__kl",
        type: "text",
      },
    ]),
    certs: generateFolder([
      {
        name: "cert.pem",
        content: `-----BEGIN CERTIFICATE-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvbX+...
  -----END CERTIFICATE-----`,
        type: "text",
      },
    ]),
    data: generateFolder([
      {
        name: "data.csv",
        content: `id,name,access_level
  001,Neo,Administrator
  002,Trinity,Hacker
  003,Morpheus,Commander
  004,Agent Smith,System`,
        type: "text",
      },
      {
        name: "diagram.png",
        content: "/files/diagram.png",
        type: "image",
      },
      {
        name: "chart.jpg",
        content: "/files/chart.jpg",
        type: "image",
      },
    ]),
  },
};

const Terminal: React.FC<TerminalProps> = ({ onOpenFile }) => {
  const [history, setHistory] = useState<TerminalLine[]>([]);
  const [command, setCommand] = useState("");
  const [currentPath, setCurrentPath] = useState<string[]>(["root"]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const getCurrentDirectory = (): Record<string, FileData> => {
    let dir: Record<string, FileData> | any = fileSystem;
    for (const segment of currentPath) {
      dir = dir[segment];
    }
    return dir;
  };

  const handleCommand = (cmd: string) => {
    let output = "";
    let isError = false;
    const args = cmd.trim().split(" ");
    const baseCmd = args[0];

    if (baseCmd === "ls") {
      const dir = getCurrentDirectory();
      const items = Object.keys(dir);
      // List items vertically:
      output = items.join("\n");
    } else if (baseCmd === "cd") {
      if (args[1] === "..") {
        if (currentPath.length > 1) {
          setCurrentPath((prev) => prev.slice(0, -1));
          output = "";
        } else {
          output = "Already at root directory.";
          isError = true;
        }
      } else {
        const dir = getCurrentDirectory();
        const target = args[1];
        if (dir[target] && typeof dir[target] === "object") {
          setCurrentPath((prev) => [...prev, target]);
          output = "";
        } else {
          output = `No such directory: ${target}`;
          isError = true;
        }
      }
    } else if (baseCmd === "open") {
      const fileName = args[1];
      const dir = getCurrentDirectory();
      const fileEntry = dir[fileName];
      if (fileEntry && fileEntry.content) {
        const isImage =
          fileName.endsWith(".png") ||
          fileName.endsWith(".jpg") ||
          fileName.endsWith(".jpeg");
        const fileData: FileData = {
          name: fileName,
          content: fileEntry.content,
          type: isImage ? "image" : "text",
        };
        onOpenFile(fileData);
        output = `Opening ${fileName}...`;
      } else {
        output = `No such file: ${fileName}`;
        isError = true;
      }
    } else if (baseCmd === "cat") {
      const fileName = args[1];
      const dir = getCurrentDirectory();
      const fileEntry = dir[fileName];
      if (fileEntry && fileEntry.content) {
        if (
          fileName.endsWith(".txt") ||
          fileName.endsWith(".json") ||
          fileName.endsWith(".config")
        ) {
          output = fileEntry.content;
        } else {
          output = `Cannot cat binary file: ${fileName}`;
          isError = true;
        }
      } else {
        output = `No such file: ${fileName}`;
        isError = true;
      }
    } else {
      output = `Command not found: ${baseCmd}`;
      isError = true;
    }

    setHistory((prev) => [
      ...prev,
      { text: `$ ${cmd}` },
      { text: output, error: isError },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(command);
      setCommand("");
    }
  };

  // Auto-focus the input when history changes
  useEffect(() => {
    inputRef.current?.focus();
  }, [history]);

  // Auto-scroll to the bottom when history changes
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="bg-black border scrollbar-hide border-green-800 rounded-lg font-spaceMono font-thin shadow-xl flex flex-col p-2  w-full h-1/2 min-h-48 max-h-80 overflow-auto">
      <div
        ref={outputRef}
        className="flex flex-col whitespace-pre-wrap text-green-500"
      >
        {history.map((line, index) => (
          <div key={index} className={line.error ? "text-red-500" : ""}>
            {line.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <span className="mr-2 text-green-400">{currentPath.join("/")}&gt;</span>
        <input
          ref={inputRef}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-grow text-green-400"
        />
      </div>
    </div>
  );
};

export default Terminal;
