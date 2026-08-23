# Installing Mazda Tweaks on Version 74+ (without a working touchscreen)

`
Requirements: Mouse, Keyboard, Flash Drive formatted to FAT32
`

I wanted to install AIO Tweaks on my car(CX-3, should work with other mazdas using the same infotainment system) using this [Tutorial](https://www.mazda3revolution.com/threads/mzd-aio-tweak-on-fw-74.252435/), but I got stuck in the first step since my touchscreen doesn't work, and the encoder/knob doesn't work in the diag menu.

## The Workaround
- I took the files from https://github.com/mzd-evo/mzd-connect-1-root/ and modified it to launch the diagnostic without user interaction.
- Using a mouse to (blindly) navigate the diagnostic menu.

## Installation
- Download/clone this repo, and move it to the root directory of the USB Drive.
- AIO Tweaks
  - Install Options
    ✓ Build run.sh
    ✓ Skip Confirmation
  - Enable Wifi & Install SSH_bringback
  - Select your desired tweaks - *See original tutorial/forum post to see which tweaks (don't) work*
  - Start compilation and copy to USB Drive.
  - After copying, modidy run.sh(according to original post), "Search for '-eq 70' and replace it with '-eq 74'." (it won't install without changing this)
- Plug the mouse and drive in.
- Navigate to entertainment menu, and select the USB Drive.
  - Wait a couple seconds, and it should automatically launch the diagnostic menu.
- Navigate with the mouse blindly. (invisible cursor)
  - Though you can't see your cursor, it's still there.
  - What I did
    - Move imaginary cursor to the bottom right, move it slightly to the left, and up, hit next twice(I think) until you see the terminal. Now, move IT up a bit, and to the left and you (hopefully) click the terminal. (the hard part ends)
- Disconnect mouse, and connect keyboard.
- Terminal
```sh
cd /tmp/mnt

ls

*In the output, there should either be an sdX1, where X can be a, b, or, c. lets say sdb1*

cd sdb1
./run.sh
```

- It shouldn't need confirmation, IF you selected "Skip Confirmation," in the install options, and should reboot on it's own after installation.

- For future installations, you can just SSH to the CMU and do the "Terminal" steps again.

**Need help? Add me on discord: shuncey**