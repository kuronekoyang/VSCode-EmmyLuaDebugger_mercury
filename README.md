![logo](/res/logo.png)
# EmmyLuaDebugger for VSCode

## FAQ (中文 & English)

**Q (中文)**: Emmy New Debug 为什么连不上目标？  
**Q (English)**: Why does Emmy New Debug fail to connect?  
**A (中文)**: 可能是插入代码 require 失败或返回 true，表明可执行文件未导出 Lua 符号  
**A (English)**: Usually the injected require code fails or returns true, indicating missing Lua symbols  

## FAQ – Debugging (中文 & English)

**Remote Debug Setup (中文)**  
1) 在 VSCode 中打开 Lua 文件  
2) 插入调试库路径并 require  
3) 在需要断点处添加 dbg.waitIDE(); dbg.breakHere()  
4) 运行外部程序等待连接  
5) 启动 “EmmyLua New Debug” 与目标调试  

**Remote Debug Setup (English)**  
1) Load your Lua file in VSCode  
2) Inject the debugger path and require it  
3) Add dbg.waitIDE(); dbg.breakHere() where you want to break  
4) Run your external program, which waits for a debugger  
5) Launch “EmmyLua New Debug” to connect and debug  
