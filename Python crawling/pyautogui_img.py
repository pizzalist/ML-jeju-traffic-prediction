import pyautogui

# print(pyautogui.position())
pyautogui.screenshot('1.png', region=(1577, 569, 30, 30))
num1 = pyautogui.locateCenterOnScreen('1.png')
pyautogui.click(num1)
pyautogui.click(num1)
pyautogui.click(num1)
pyautogui.click(num1)
pyautogui.click(num1)
