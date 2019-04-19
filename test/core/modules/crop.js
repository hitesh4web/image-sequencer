var test = require('tape')
var base64Img = require('base64-img')
var looksSame = require('looks-same')

require('../../../src/ImageSequencer')

var sequencer = ImageSequencer({ui: false})
var red = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAIAAAAiOjnJAAAKGGlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzcgMS4wMDAwMDAsIDAwMDAvMDAvMDAtMDA6MDA6MDAgICAgICAgICI+CiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICB4bWxuczpuczE9Imh0dHA6Ly93d3cuZGF5LmNvbS9kYW0vMS4wIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iCiAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICBuczE6UGh5c2ljYWxoZWlnaHRpbmluY2hlcz0iLTEuMCIKICAgbnMxOlBoeXNpY2Fsd2lkdGhpbmluY2hlcz0iLTEuMCIKICAgbnMxOkZpbGVmb3JtYXQ9IlBORyIKICAgbnMxOlByb2dyZXNzaXZlPSJubyIKICAgbnMxOmV4dHJhY3RlZD0iMjAxNy0xMS0yNFQwNTo0Nzo1MC45NTktMDU6MDAiCiAgIG5zMTpCaXRzcGVycGl4ZWw9IjI0IgogICBuczE6TUlNRXR5cGU9ImltYWdlL3BuZyIKICAgbnMxOkNvbW1lbnRzPSJTb2Z0d2FyZTogQWRvYmUgSW1hZ2VSZWFkeSYjeEE7WE1MOmNvbS5hZG9iZS54bXA6ICZsdDs/eHBhY2tldCBiZWdpbj0mcXVvdDvvu78mcXVvdDsgaWQ9JnF1b3Q7VzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJnF1b3Q7PyZndDsgJmx0O3g6eG1wbWV0YSB4bWxuczp4PSZxdW90O2Fkb2JlOm5zOm1ldGEvJnF1b3Q7IHg6eG1wdGs9JnF1b3Q7QWRvYmUgWE1QIENvcmUgNS4wLWMwNjEgNjQuMTQwOTQ5LCAyMDEwLzEyLzA3LTEwOjU3OjAxICAgICAgICAmcXVvdDsmZ3Q7ICZsdDtyZGY6UkRGIHhtbG5zOnJkZj0mcXVvdDtodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjJnF1b3Q7Jmd0OyAmbHQ7cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0mcXVvdDsmcXVvdDsgeG1sbnM6eG1wPSZxdW90O2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8mcXVvdDsgeG1sbnM6eG1wTU09JnF1b3Q7aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyZxdW90OyB4bWxuczpzdFJlZj0mcXVvdDtodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjJnF1b3Q7IHhtcDpDcmVhdG9yVG9vbD0mcXVvdDtBZG9iZSBQaG90b3Nob3AgQ1M1LjEgTWFjaW50b3NoJnF1b3Q7IHhtcE1NOkluc3RhbmNlSUQ9JnF1b3Q7eG1wLmlpZDoyREFBQTI3NEMzODUxMUU3OUIyMUMyN0ZDQ0Y2OTRDNCZxdW90OyB4bXBNTTpEb2N1bWVudElEPSZxdW90O3htcC5kaWQ6MkRBQUEyNzVDMzg1MTFFNzlCMjFDMjdGQ0NGNjk0QzQmcXVvdDsmZ3Q7ICZsdDt4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSZxdW90O3htcC5paWQ6MkRBQUEyNzJDMzg1MTFFNzlCMjFDMjdGQ0NGNjk0QzQmcXVvdDsgc3RSZWY6ZG9jdW1lbnRJRD0mcXVvdDt4bXAuZGlkOjJEQUFBMjczQzM4NTExRTc5QjIxQzI3RkNDRjY5NEM0JnF1b3Q7LyZndDsgJmx0Oy9yZGY6RGVzY3JpcHRpb24mZ3Q7ICZsdDsvcmRmOlJERiZndDsgJmx0Oy94OnhtcG1ldGEmZ3Q7ICZsdDs/eHBhY2tldCBlbmQ9JnF1b3Q7ciZxdW90Oz8mZ3Q7JiN4QTsiCiAgIG5zMTpQaHlzaWNhbHdpZHRoaW5kcGk9Ii0xIgogICBuczE6UGh5c2ljYWxoZWlnaHRpbmRwaT0iLTEiCiAgIG5zMTpOdW1iZXJvZmltYWdlcz0iMSIKICAgbnMxOk51bWJlcm9mdGV4dHVhbGNvbW1lbnRzPSIyIgogICBuczE6c2hhMT0iM2UxZjc2MjlkN2Q4MmZkMTA4MjE1NDg2YTUyOTExODlkMTQzZjg5ZiIKICAgbnMxOnNpemU9IjEyODgiCiAgIHRpZmY6SW1hZ2VMZW5ndGg9IjIwMCIKICAgdGlmZjpJbWFnZVdpZHRoPSIyMDAiCiAgIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIKICAgZGM6Zm9ybWF0PSJpbWFnZS9wbmciCiAgIGRjOm1vZGlmaWVkPSIyMDE3LTExLTMwVDA3OjIwOjAwLjU1MC0wNTowMCIKICAgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyREFBQTI3NUMzODUxMUU3OUIyMUMyN0ZDQ0Y2OTRDNCIKICAgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyREFBQTI3NEMzODUxMUU3OUIyMUMyN0ZDQ0Y2OTRDNCI+CiAgIDx4bXBNTTpEZXJpdmVkRnJvbQogICAgc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyREFBQTI3MkMzODUxMUU3OUIyMUMyN0ZDQ0Y2OTRDNCIKICAgIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MkRBQUEyNzNDMzg1MTFFNzlCMjFDMjdGQ0NGNjk0QzQiLz4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cgo8P3hwYWNrZXQgZW5kPSJyIj8+Pz8bfgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAF6SURBVHja7NIxEQAwCACxUhNs+BeDKEwwMCQS/j4668G2LwHGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY4GxMBbGAmNhLIwFxsJYGAuMhbEwFhgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFsbCWGAsjIWxwFgYC2OBsTAWxgJjYSyMBcbCWBgLjIWxMBYYC2NhLDAWxsJYYCyMhbHAWBgLY2EsMBbGwlhgLIyFscBYGAtjgbEwFsYCY2EsjAXGwlgYC4yFsTAWGAtjYSwwFteMAAMANTQCkRd9lbYAAAAASUVORK5CYII="
var benchmark = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAAklEQVR4AewaftIAAAH0SURBVO3BMRECAQADsNJ7D2yYwL8DTLDhAhBAZ35Icnlcb+8APzXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMDXA1ABTA0wNMB2BE7u/nvmn4/56BvitAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoCpAaYGmBpgaoDpCJzY5St/9AEkRAeSLWe/wwAAAABJRU5ErkJggg==";
var target = 'test_outputs'

var options = {x: "32", y: "38", width:"100", height: "100", backgroundColor: "255 255 255 255"}

test('Crop module loads correctly', function(t) {
  sequencer.loadImages(red)
  sequencer.addSteps('crop')
  t.equal(sequencer.steps.length, 2, 'Crop module loaded')
  t.end()
})

test('Crop module loads with correct options', function(t) {
  sequencer.addSteps('crop', options)
  t.equal(sequencer.steps[2].options.width, "100", 'options loaded correctly')
  t.end()
})

test('Crop module works correctly', function(t) {
  sequencer.run({mode:'test'}, function(out) {
    var result = sequencer.steps[2].output.src
    base64Img.imgSync(result, target, 'result')
    base64Img.imgSync(benchmark, target, 'benchmark')
    result = './test_outputs/result.png'
    benchmark = './test_outputs/benchmark.png'
    looksSame(result, benchmark, function(err, res) {
      if (err) console.log(err)
      t.equal(res.equal, true)
      t.end()
    })
  })
})