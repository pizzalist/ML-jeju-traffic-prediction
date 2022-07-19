import pyautogui
import time

pyautogui.moveTo(1386, 408, 2)
pyautogui.doubleClick()
time.sleep(1)

pyautogui.typewrite(['a', 'b', 'c', 'enter'])
pyautogui.typewrite(['abc', 'enter'])
