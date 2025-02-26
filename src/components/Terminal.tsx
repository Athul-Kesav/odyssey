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
        content: `<div className="font-laBelle font-thin text-white">
        {
  "system_nAme": "mAtrix control unit",
  "system_mode": "Active",
  "Ai_core": {
    "leArning_rAte": 0.007,
    "AdAptive_protocol": "neurAl simulAtion",
    "control_fActor": "nexus",
    "override_enAbled": true
  },
  "mAtrix_control": {
    "surveillAnce": true,
    "mind_control": true,
    "populAtion_monitoring": "Active"
  },
  "network_status": "online",
  "security": {
    "encryption": "Aes-256",
    "firewall": "Advanced",
    "Access_level": "Admin"
  },
  "logging": {
    "level": "debug",
    "sAve_intervAl": 15
  },
  "bAckup": {
    "enAbled": true,
    "frequency": "dAily"
  }
}

  </div>`,
        type: "text",
      },
      {
        name: "system.config",
        content: `<div className="text-white"># ai supercoMputer Matrix control configuration

[general]
systeMid = delta-oMega
version = 4.5.9
Mode = hyper-vision
startupdelay = 3

[ai]
coreactive = true
learningrate = 0.006
adaptationMode = quantuM
overridecoMand = synapse

[Matrix]
controlstatus = engaged
surveillance = oMni
Mindinfluence = absolute
populationMonitor = real-tiMe

[security]
encryptionprotocol = aes-512
firewallstatus = reinforced
accesslevel = supreMe

[logging]
logMode = verbose
recordinterval = 5

[backup]
autobackup = enabled
backupfrequency = weekly
storageliMit = 2048GB

  </div>`,
        type: "text",
      },
    ]),
    users: generateFolder([
      {
        name: "user1.profile",
        content: `<div className="text-white">{
  "uSername": "SiriuS",
  "role": "adminiStrator",
  "StatuS": "active",
  "acceS_level": "SuperuSer",
  "bio": "leading the digital revolution in the matrix with unwavering preciSion",
  "laSt_login": "2050-03-02T10:12:34Z"
}</div>`,
        type: "text",
      },
      {
        name: "user2.profile",
        content: `<div className="text-white">{
  "useRname": "cascade",
  "Role": "opeRatoR",
  "status": "engaged",
  "access_level": "RestRicted",
  "bio": "monitoRing system pRocesses and managing netwoRk integRity",
  "last_login": "2050-03-02T11:05:21Z"
}
</div>`,
        type: "text",
      },
    ]),
    backups: generateFolder([
      {
        name: "backup-2050-02-28.zip",
        content: `<div className="text-white">EncryptEd backup archivE: backup-2050-02-28.zip
-----------------------------------------------------
crEatEd: 2050-02-28 03:14 utc
Encryption: aEs-256
chEcksum: a1b2c3d4E5f6g7h8

filEs includEd:
  - config/sEttings.json        [Encrypted]
  - config/app.config           [Encrypted]
  - usErs/usEr1.profilE         [Encrypted]
  - users/user2.profilE         [Encrypted]
  - logs/systEm.log             [Encrypted]
  - logs/Error.log              [Encrypted]
  - sEcrEts/apikEy.txt          [sEcurEd]
  - cErts/cErt.pEm              [sEcurEd]
  - data/data.csv               [Encrypted]
  - data/diagram.jpg            [sEcurEd]
  - data/chart.jpg              [sEcurEd]

status: backup vErifiEd
-----------------------------------------------------
End of archivE mEtadata
</div>`,
        type: "text",
      },
    ]),
    logs: generateFolder([
      {
        name: "system.log",
        content: `<div className="text-white">[2050-02-26 08:45:12] system boXting...
[2050-02-26 08:45:14] services iXitialized.
[2050-02-26 08:46:01] user 'neo' logged in.
[2050-02-26 08:47:23] conneXtions eXpanding aXross the neXtwork.
[2050-02-26 08:48:05] processiXg data with eXtreme efficieXcy.
[2050-02-26 08:49:30] error: module 'ai-core.dll' failed to load.
[2050-02-26 08:50:00] reXbooting subsysteXm for maXimum performaXce.
[2050-02-26 08:51:45] debug: indeX variXle reXset.</div>`,
        type: "text",
      },
      {
        name: "error.log",
        content: `<div className="text-white">[2050-02-26 09:05:34] ERROR: Failed to load module 'ai-core.dll'.
  [2050-02-27 09:06:12] WARNING: Unusual activity detected from IP 192.168.1.42.
  [2050-02-28 09:07:45] CRITICAL: Unauthorized access attempt detected!</div>`,
        type: "text",
      },
    ]),
    secrets: generateFolder([
      {
        name: "apikey.txt",
        content: `<div className="text-white">ghijhbAEFF244dEFSDCsdfr@dsf#dfch__kl</div>`,
        type: "text",
      },
    ]),
    certs: generateFolder([
      {
        name: "cert.pem",
        content: `<div className="text-white">-----BEGIN CERTIFICATE-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvbX+...
  -----END CERTIFICATE-----</div>`,
        type: "text",
      },
    ]),
    data: generateFolder([
      {
        name: "data.csv",
        content: `<div className="text-white">id,name,access_level
OO1,neO,administratOr
OO2,trinity,hacker
OO3,mOrpheus,cOmmander
OO4,agent smith,system</div>
`,
        type: "text",
      },
      {
        name: "diagram.jpg",
        content: "/files/diagram.jpg",
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
    <div className="bg-black border scrollbar-hide z-50 border-green-800 rounded-lg font-spaceMono font-thin shadow-xl flex flex-col p-2  w-full h-1/2 min-h-48 max-h-80 overflow-auto">
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
